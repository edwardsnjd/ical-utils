const test = require('ava');
const {summaryMatchesRegex} = require('./filters');

test('filters.summaryMatchesRegex - does not match missing summary', t => {
    const startsWithFoo = summaryMatchesRegex(/^foo/);
    t.false(startsWithFoo({}));
});

test('filters.summaryMatchesRegex - does not match different summary', t => {
    const startsWithFoo = summaryMatchesRegex(/^foo/);
    t.false(startsWithFoo({summary: ''}));
});

test('filters.summaryMatchesRegex - matches summary', t => {
    const startsWithFoo = summaryMatchesRegex(/^foo/);
    t.true(startsWithFoo({summary: 'foo: bar'}));
});