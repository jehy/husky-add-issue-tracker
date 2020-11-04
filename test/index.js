'use strict';

const {assert} = require('chai');
const lib = require('../lib');

describe('checkNeedOverride', ()=>{

  it('should override when no merge message', ()=>{
    const message = 'XXX-666: make some legacy code';
    const need = lib.checkNeedOverride(message);
    assert.equal(need, true);
  });
  it('should not override when merge message', ()=>{
    const message = 'Merge branch \'XXX-666-release-19.12.2018\' of bitbucket.org:me/my into XXX-666-pre\n';
    const need = lib.checkNeedOverride(message);
    assert.equal(need, false);
  });
});

describe('getTaskName', ()=>{

  it('should get task name from branch', ()=>{
    const branchName = 'XXX-666-make-some-legacy-code';
    const taskName = lib.getTaskName(branchName);
    assert.equal(taskName, 'XXX-666');
  });
  it('should get task name from branch with lowercase', ()=>{
    const branchName = 'xxx-666-make-some-legacy-code';
    const taskName = lib.getTaskName(branchName);
    assert.equal(taskName, 'xxx-666');
  });
  it('should get task name from branch with prefix feature', ()=>{
    const branchName = 'feature/XXX-666-make-some-legacy-code';
    const taskName = lib.getTaskName(branchName);
    assert.equal(taskName, 'XXX-666');
  });
  it('should not get task name from random garbage', ()=>{
    const branchNames = ['dev', 'master', '666', 'XXX', 'test-branch'];
    branchNames.forEach((branchName)=>{
      const taskName = lib.getTaskName(branchName);
      assert.equal(taskName, false);
    });
  });
});

describe('formatCommitMessage', ()=>{

  it('should add task name when non exists', ()=>{
    const message = 'make some legacy code';
    const taskName = 'XXX-666';
    const newCommitMessage = lib.formatCommitMessage(taskName, message);
    assert.equal(newCommitMessage, `${taskName}: ${message}`);
  });
  it('should not add task name when it exists', ()=>{
    const message = 'XXX-666: make some legacy code';
    const taskName = 'XXX-666';
    const newCommitMessage = lib.formatCommitMessage(taskName, message);
    assert.equal(newCommitMessage, message);
  });
  it('should only add space when task name exists', ()=>{
    const message = 'XXX-666:make some legacy code';
    const taskName = 'XXX-666';
    const newCommitMessage = lib.formatCommitMessage(taskName, message);
    assert.equal(newCommitMessage, 'XXX-666: make some legacy code');
  });
  it('should add task name with number', () => {
    const message = 'make some legacy code with number in task';
    const taskName = 'X2X-666';
    const newCommitMessage = lib.formatCommitMessage(taskName, message);
    assert.equal(newCommitMessage, `${taskName}: ${message}`);
  });
  it('should not add task name with number when it exists', ()=>{
    const message = 'X2X-666: make some legacy code';
    const taskName = 'X2X-666';
    const newCommitMessage = lib.formatCommitMessage(taskName, message);
    assert.equal(newCommitMessage, message);
  });
});

describe('commitHasTaskName', () => {

  it('Should return true - commit starts with task name', () => {
    assert.equal(lib.commitHasTaskName('X2X-666: make some legacy code'), true);
  });
  it('Should return false - commit includes task name', () => {
    assert.equal(lib.commitHasTaskName('task bla bla bla X2X-666: make some legacy code'), false);
  });
  it('Should return false - commit not includes task name', () => {
    assert.equal(lib.commitHasTaskName('make some legacy code'), false);
  });
});
