const test = require('ava');
const moment = require('moment');

const {
    selectSummary,
    dateToMoment,
    datesToMoments,
    addDurationInHours,
    dateToIso,
    datesToIso,
    dateToFormat,
    datesToFormat,
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
            uid: 'foobar456',
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
            uid: 'foobar123',
            start: new Date(0),
            end: new Date(1000 * 60 * 60),
            summary: 'Summary 1',
            description: 'Description 1',
        },
        {
            uid: 'foobar456',
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

test('transforms.dateToMoment - converts date to moment', t => {
    const results = SAMPLE_EVENTS.summary.map(dateToMoment('start'));
    t.true(moment.isMoment(results[0].start));
    t.true(moment.isMoment(results[1].start));
});

test('transforms.dateToMoment - leaves other fields unchanged', t => {
    const results = SAMPLE_EVENTS.summary.map(dateToMoment('start'));
    t.is(results[0].summary, SAMPLE_EVENTS.summary[0].summary);
    t.is(results[1].summary, SAMPLE_EVENTS.summary[1].summary);
});

test('transforms.datesToMoments - converts dates to moments', t => {
    const results = SAMPLE_EVENTS.summary.map(datesToMoments('start', 'end'));
    t.true(moment.isMoment(results[0].start));
    t.true(moment.isMoment(results[0].end));
    t.true(moment.isMoment(results[1].start));
    t.true(moment.isMoment(results[1].end));
});

test('transforms.dateToMoment - leaves other fields unchanged', t => {
    const results = SAMPLE_EVENTS.summary.map(datesToMoments('start', 'end'));
    t.is(results[0].summary, SAMPLE_EVENTS.summary[0].summary);
    t.is(results[1].summary, SAMPLE_EVENTS.summary[1].summary);
});

test('transforms.dateToIso - converts dates to ISO strings', t => {
    const results = SAMPLE_EVENTS.summary.map(dateToIso('start'));
    t.true(typeof results[0].start === 'string');
    t.true(typeof results[1].start === 'string');
});

test('transforms.dateToIso - leaves other fields unchanged', t => {
    const results = SAMPLE_EVENTS.summary.map(dateToIso('start'));
    t.is(results[0].summary, SAMPLE_EVENTS.summary[0].summary);
    t.is(results[1].summary, SAMPLE_EVENTS.summary[1].summary);
});

test('transforms.datesToIso - converts dates to ISO strings', t => {
    const results = SAMPLE_EVENTS.summary.map(datesToIso('start', 'end'));
    t.true(typeof results[0].start === 'string');
    t.true(typeof results[1].start === 'string');
    t.true(typeof results[0].end === 'string');
    t.true(typeof results[1].end === 'string');
});

test('transforms.datesToIso - leaves other fields unchanged', t => {
    const results = SAMPLE_EVENTS.summary.map(datesToIso('start', 'end'));
    t.is(results[0].summary, SAMPLE_EVENTS.summary[0].summary);
    t.is(results[1].summary, SAMPLE_EVENTS.summary[1].summary);
});

test('transforms.datesToIso - converts dates to ISO strings', t => {
    const results = SAMPLE_EVENTS.summary.map(datesToIso('start', 'end'));
    t.true(typeof results[0].start === 'string');
    t.true(typeof results[1].start === 'string');
    t.true(typeof results[0].end === 'string');
    t.true(typeof results[1].end === 'string');
});

test('transforms.datesToIso - leaves other fields unchanged', t => {
    const results = SAMPLE_EVENTS.summary.map(datesToIso('start', 'end'));
    t.is(results[0].summary, SAMPLE_EVENTS.summary[0].summary);
    t.is(results[1].summary, SAMPLE_EVENTS.summary[1].summary);
});

test('transforms.dateToFormat - converts dates to given format string', t => {
    const results = SAMPLE_EVENTS.summary.map(dateToFormat('[Year]: YYYY-MM', 'start'));
    t.is(results[0].start, 'Year: 1970-01');
    t.is(results[1].start, 'Year: 1970-01');
});

test('transforms.dateToFormat - leaves other fields unchanged', t => {
    const results = SAMPLE_EVENTS.summary.map(dateToFormat('[Year]: YYYY-MM', 'start'));
    t.is(results[0].summary, SAMPLE_EVENTS.summary[0].summary);
    t.is(results[1].summary, SAMPLE_EVENTS.summary[1].summary);
});

test('transforms.datesToFormat - converts dates to given format string', t => {
    const results = SAMPLE_EVENTS.summary.map(datesToFormat('[Year]: YYYY-MM', 'start', 'end'));
    t.is(results[0].start, 'Year: 1970-01');
    t.is(results[1].start, 'Year: 1970-01');
    t.is(results[0].end, 'Year: 1970-01');
    t.is(results[1].end, 'Year: 1970-01');
});

test('transforms.datesToFormat - leaves other fields unchanged', t => {
    const results = SAMPLE_EVENTS.summary.map(datesToFormat('[Year]: YYYY-MM', 'start', 'end'));
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
