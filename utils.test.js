const test = require('ava');
const sinon = require('sinon');

const {tapLog,tapLogWithPrefix} = require('./utils');

// TESTS

test('utils.tapLog - returns arg unchanged', t => {
    const stub = sinon.stub(console, 'log');
    const obj = {};
    t.is(tapLog(obj), obj);
    stub.restore();
});

test('utils.tapLog - logs just arg', t => {
    const stub = sinon.stub(console, 'log');
    const obj = {};
    tapLog(obj);
    stub.calledWithExactly(obj);
    stub.restore();
});

test('utils.tapLogWithPrefix - returns arg unchanged', t => {
    const stub = sinon.stub(console, 'log');
    const obj = {};
    t.is(tapLogWithPrefix('prefix')(obj), obj);
    stub.restore();
});

test('utils.tapLogWithPrefix - logs prefix and arg', t => {
    const stub = sinon.stub(console, 'log');
    const obj = {};
    tapLogWithPrefix('prefix')(obj);
    stub.calledWithExactly('prefix', obj);
    stub.restore();
});
