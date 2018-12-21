#!/usr/bin/env node

'use strict';

const lib = require('./lib.js');

const commitMessage = lib.getCommitMessage();
if (!lib.checkNeedOverride(commitMessage)) {
  process.exit(0);
}
const branchName = lib.getBranchName();
const taskName = lib.getTaskName(branchName);
if (!taskName) // some bad branch, like dev or master
{
  process.exit(0);
}
const newCommitMessage = lib.formatCommitMessage(taskName, commitMessage);
if (newCommitMessage !== commitMessage)
{
  lib.setCommitMessage(newCommitMessage);
}
process.exit(0);
