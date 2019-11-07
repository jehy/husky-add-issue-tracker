'use strict';

const fs = require('fs');
const path = require('path');
const {execSync} = require('child_process');

/* istanbul ignore next */
function getGitCommitMessageFilePath()
{
  const tryLocal = path.join(process.env.PWD, '.git', 'COMMIT_EDITMSG');
  if (fs.existsSync(tryLocal))
  {
    return tryLocal;
  }
  // Ugly workaround, I did not manage to find a better way
  const gitIndexFile = process.env.GIT_INDEX_FILE;
  if (!gitIndexFile)
  {
    throw new Error('Could not get git directory!');
  }
  return path.join(gitIndexFile.replace('index.lock', ''), 'COMMIT_EDITMSG');
}

/* istanbul ignore next */
function getCommitMessage()
{
  return fs.readFileSync(getGitCommitMessageFilePath(), 'utf8');
}

/* istanbul ignore next */
function setCommitMessage(commitMessage)
{
  fs.writeFileSync(getGitCommitMessageFilePath(), commitMessage, 'utf8');
}

function checkNeedOverride(commitMessage)
{
  if (commitMessage.toLowerCase().startsWith('merge'))
  {
    return false;
  }
  return true;
}

/* istanbul ignore next */
function getBranchName()
{
  // See https://stackoverflow.com/questions/6245570/how-to-get-the-current-branch-name-in-git
  const branchName = execSync('git rev-parse --abbrev-ref HEAD').toString('utf8').trim();
  if (branchName === 'HEAD') //  it does not work if you are in a 'detached HEAD' state
  {
    return execSync('git branch | grep * | cut -d \' \' -f2').toString('utf8').trim();
  }
  return branchName;
}

function getTaskName(branchName)
{
  const regExp = /([A-Za-z0-9]+-[0-9]+(--[A-Za-z]+-[0-9]+)?).*/;
  const res = regExp.exec(branchName);
  if (!res || !res[1]) // some kind of shitty branch
  {
    return false;
  }
  return res[1];
}

function formatCommitMessage(taskName, commitMessage)
{
  if (commitMessage.startsWith(`${taskName}: `)) { // it is already fine
    return commitMessage;
  }
  if (commitMessage.startsWith(`${taskName}:`)) {
    return commitMessage.replace(`${taskName}:`, `${taskName}: `);// add space
  }
  return `${taskName}: ${commitMessage}`;
}

module.exports = {
  getCommitMessage,
  setCommitMessage,
  checkNeedOverride,
  getBranchName,
  getTaskName,
  formatCommitMessage,
};
