const test = require('ava');
const moment = require('moment');

const {
    selectSummary,
    fieldToMoment,
    fieldsToMoments,
    addDurationInHours,
    fieldToIso,
    fieldsToIso,
} = require('./transforms');

// SAMPLE DATA

const SAMPLE_EVENTS = {
    ical: [
        {
            type: 'VEVENT',
            params: [],
            start: new Date(0),
            end: new Date(1000 * 60 * 60),
            dtstamp: '20170210T052758Z',
            uid: 'foobar123',
            created: '20170209T003751Z',
            description: 'Description 1',
            'last-modified': '20170209T085207Z',
            location: '',
            sequence: '0',
            status: 'CONFIRMED',
            summary: 'Summary 1',
            transparency: 'OPAQUE',
            'APPLE-TRAVEL-ADVISORY-BEHAVIOR': 'AUTOMATIC',
            'miscid': {
                type: 'VALARM',
                params: [],
                action: 'NONE',
                uid: 'miscid',
            }
        },
        {
            type: 'VEVENT',
            params: [],
            start: new Date(9000),
            end: new Date(9000 + 1000 * 60 * 60),
            dtstamp: '20170210T052758Z',
            uid: 'foobar123',
            created: '20170209T003751Z',
            description: 'Description 2',
            'last-modified': '20170209T085207Z',
            location: '',
            sequence: '0',
            status: 'CONFIRMED',
            summary: 'Summary 2',
            transparency: 'OPAQUE',
            'APPLE-TRAVEL-ADVISORY-BEHAVIOR': 'AUTOMATIC',
            'miscid': {
                type: 'VALARM',
                params: [],
                action: 'NONE',
                uid: 'miscid',
            }
        },
    ],
    summary: [
        {
            start: new Date(0),
            end: new Date(1000 * 60 * 60),
            summary: 'Summary 1',
            description: 'Description 1',
        },
        {
            start: new Date(9000),
            end: new Date(9000 + 1000 * 60 * 60),
            summary: 'Summary 2',
            description: 'Description 2',
        },
    ],
}

// TESTS

test('transforms.selectSummary - extracts correct fields', t => {
    const results = SAMPLE_EVENTS.ical.map(selectSummary);
    t.deepEqual(results, SAMPLE_EVENTS.summary);
});

test('transforms.fieldToMoment - converts date to moment', t => {
    const results = SAMPLE_EVENTS.summary.map(fieldToMoment('start'));
    t.true(moment.isMoment(results[0].start));
    t.true(moment.isMoment(results[1].start));
});

test('transforms.fieldToMoment - leaves other fields unchanged', t => {
    const results = SAMPLE_EVENTS.summary.map(fieldToMoment('start'));
    t.is(results[0].summary, SAMPLE_EVENTS.summary[0].summary);
    t.is(results[1].summary, SAMPLE_EVENTS.summary[1].summary);
});

test('transforms.fieldsToMoments - converts dates to moments', t => {
    const results = SAMPLE_EVENTS.summary.map(fieldsToMoments('start', 'end'));
    t.true(moment.isMoment(results[0].start));
    t.true(moment.isMoment(results[0].end));
    t.true(moment.isMoment(results[1].start));
    t.true(moment.isMoment(results[1].end));
});

test('transforms.fieldToMoment - leaves other fields unchanged', t => {
    const results = SAMPLE_EVENTS.summary.map(fieldsToMoments('start', 'end'));
    t.is(results[0].summary, SAMPLE_EVENTS.summary[0].summary);
    t.is(results[1].summary, SAMPLE_EVENTS.summary[1].summary);
});

test('transforms.fieldToIso - converts dates to ISO strings', t => {
    const results = SAMPLE_EVENTS.summary.map(fieldToIso('start'));
    t.true(typeof results[0].start === 'string');
    t.true(typeof results[1].start === 'string');
});

test('transforms.fieldToIso - leaves other fields unchanged', t => {
    const results = SAMPLE_EVENTS.summary.map(fieldToIso('start'));
    t.is(results[0].summary, SAMPLE_EVENTS.summary[0].summary);
    t.is(results[1].summary, SAMPLE_EVENTS.summary[1].summary);
});

test('transforms.fieldsToIso - converts dates to ISO strings', t => {
    const results = SAMPLE_EVENTS.summary.map(fieldsToIso('start', 'end'));
    t.true(typeof results[0].start === 'string');
    t.true(typeof results[1].start === 'string');
    t.true(typeof results[0].end === 'string');
    t.true(typeof results[1].end === 'string');
});

test('transforms.fieldsToIso - leaves other fields unchanged', t => {
    const results = SAMPLE_EVENTS.summary.map(fieldsToIso('start', 'end'));
    t.is(results[0].summary, SAMPLE_EVENTS.summary[0].summary);
    t.is(results[1].summary, SAMPLE_EVENTS.summary[1].summary);
});

test('transforms.addDurationInHours - adds duration in hours', t => {
    const ev = {
        start: new Date(0),
        end: new Date(1000 * 60 * 60 * 1.5),
    };
    const result = addDurationInHours(ev);
    t.is(result.durationInHours, 1.5);
});
