# husky-add-issue-tracker

[![npm](https://img.shields.io/npm/v/husky-add-issue-tracker.svg)](https://npm.im/husky-add-issue-tracker)
[![license](https://img.shields.io/npm/l/husky-add-issue-tracker.svg)](https://npm.im/husky-add-issue-tracker)
[![Build Status](https://travis-ci.org/jehy/husky-add-issue-tracker.svg?branch=master)](https://travis-ci.org/jehy/husky-add-issue-tracker)
[![dependencies Status](https://david-dm.org/jehy/husky-add-issue-tracker/status.svg)](https://david-dm.org/jehy/husky-add-issue-tracker)
[![devDependencies Status](https://david-dm.org/jehy/husky-add-issue-tracker/dev-status.svg)](https://david-dm.org/jehy/husky-add-issue-tracker?type=dev)
[![Coverage Status](https://coveralls.io/repos/github/jehy/husky-add-issue-tracker/badge.svg?branch=master)](https://coveralls.io/github/jehy/husky-add-issue-tracker?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/jehy/husky-add-issue-tracker/badge.svg)](https://snyk.io/test/github/jehy/husky-add-issue-tracker)

Add this module to automatically add issue tracker task number to commit messages.

For example, if you are on branch `XXX-666-add-legacy-code` and you add a commit with
message `added some legacy code`, you message will turn into `XXX-666: added some legacy code`.
#### Install

```bash
npm i husky-add-issue-tracker
```

#### Usage (package.json)

```json
{
  "husky": {
    "hooks": {
      "prepare-commit-msg": "husky-add-issue-tracker"
    }
  }
}
```
