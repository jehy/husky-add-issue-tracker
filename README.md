# husky-add-issue-tracker

[![npm](https://img.shields.io/npm/v/husky-add-issue-tracker.svg)](https://npm.im/husky-add-issue-tracker)
[![license](https://img.shields.io/npm/l/husky-add-issue-tracker.svg)](https://npm.im/husky-add-issue-tracker)
[![Build Status](https://travis-ci.org/jehy/husky-add-issue-tracker.svg?branch=master)](https://travis-ci.org/jehy/checkExact)
[![dependencies Status](https://david-dm.org/jehy/husky-add-issue-tracker/status.svg)](https://david-dm.org/jehy/checkExact)
[![devDependencies Status](https://david-dm.org/jehy/husky-add-issue-tracker/dev-status.svg)](https://david-dm.org/jehy/checkExact?type=dev)
[![Known Vulnerabilities](https://snyk.io/test/github/jehy/husky-add-issue-tracker/badge.svg)](https://snyk.io/test/github/jehy/checkExact)

Add this module to add issue tracker task number to commit messages.

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
