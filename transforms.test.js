const test = require('ava');
const moment = require('moment');

const {selectSummary,fieldToMoment,fieldsToMoments,addDurationInHours,} = require('./transforms');

// SAMPLE DATA

const startDate = new Date(0);
const endDate = new Date(1000 * 60 * 60);

const SAMPLE_EVENTS = {
    ical: {
        type: 'VEVENT',
        params: [],
        start: startDate,
        end: endDate,
        dtstamp: '20170210T052758Z',
        uid: 'foobar123',
        created: '20170209T003751Z',
        description: 'A description',
        'last-modified': '20170209T085207Z',
        location: '',
        sequence: '0',
        status: 'CONFIRMED',
        summary: 'A summary',
        transparency: 'OPAQUE',
        'APPLE-TRAVEL-ADVISORY-BEHAVIOR': 'AUTOMATIC',
        'miscid': {
            type: 'VALARM',
            params: [],
            action: 'NONE',
            uid: 'miscid',
        }
    },
    summary: {
        start: startDate,
        end: endDate,
        summary: 'A summary',
        description: 'A description',
    },
}

// TESTS

test('transforms.selectSummary - extracts correct fields', t => {
    t.deepEqual(selectSummary(SAMPLE_EVENTS.ical), SAMPLE_EVENTS.summary);
});

test('transforms.fieldToMoment - converts date to moment', t => {
    const result = fieldToMoment('start')(SAMPLE_EVENTS.summary);
    t.true(moment.isMoment(result.start));
});

test('transforms.fieldsToMoments - converts dates to moments', t => {
    const result = fieldsToMoments('start', 'end')(SAMPLE_EVENTS.summary);
    t.true(moment.isMoment(result.start));
    t.true(moment.isMoment(result.end));
});

test('transforms.addDurationInHours - adds duration in hours', t => {
    const ev = {
        start: new Date(0),
        end: new Date(1000 * 60 * 60 * 1.5),
    };
    const result = addDurationInHours(ev);
    t.is(result.durationInHours, 1.5);
});
