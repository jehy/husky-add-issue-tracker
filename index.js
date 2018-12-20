#!/usr/bin/env node

'use strict';

const fs = require('fs');
const {execSync} = require('child_process');

const commitEditMsg = fs.readFileSync('.git/COMMIT_EDITMSG', 'utf8');
if (commitEditMsg.startsWith('merge'))
{
  process.exit(0);
}
const branch = execSync('git rev-parse --abbrev-ref HEAD').toString('utf8').trim();
// console.log(`branch: ${branch}`);
const regExp = /([A-Z]+-[0-9]+(--[A-Z]+-[0-9]+)?).*/;
const res = regExp.exec(branch);
if (!res || !res[1]) // some kind of shitty branch
{
  process.exit(0);
}
const taskName = res[1];
// console.log(`taskName: ${taskName}`);
/* const description = execSync(`git config branch.${branch}.description`);
console.log(`description: ${description}`);
if(description)
{
  fs.writeFileSync('.git/COMMIT_EDITMSG', description);
}
*/

if (!commitEditMsg.startsWith(`${taskName}: `))
{
  fs.writeFileSync('.git/COMMIT_EDITMSG', `${taskName}: ${commitEditMsg}`);
}
process.exit(0);
