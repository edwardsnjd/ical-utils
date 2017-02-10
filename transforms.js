const moment = require('moment');

const MS_PER_HOUR = 1000 * 60 * 60;

const shallowClone = Object.assign.bind(Object, {});

const selectSummary = (ev) => ({
    start: ev.start,
    end: ev.end,
    summary: ev.summary,
    description: ev.description,
});

const fieldToMoment = (field) => (ev) =>
    Object.assign(shallowClone(ev), {
        [field]: moment(ev[field]),
    });

const fieldsToMoments = (...fieldNames) => (ev) =>
    fieldNames.reduce((acc, field) => fieldToMoment(field)(acc), shallowClone(ev));

const addDurationInHours = (ev) =>
    Object.assign(shallowClone(ev), {
        durationInHours: getDuration(ev) / MS_PER_HOUR,
    });

const getDuration = (ev) =>
    ev.end - ev.start;

module.exports = {
    selectSummary,
    fieldToMoment,
    fieldsToMoments,
    addDurationInHours,
};
