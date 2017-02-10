const moment = require('moment');

const MS_PER_HOUR = 1000 * 60 * 60;

const shallowClone = (obj) =>
    Object.assign({}, obj);

// Transform the given event to a simpler summary structure
const selectSummary = (ev) => ({
    start: ev.start,
    end: ev.end,
    summary: ev.summary,
    description: ev.description,
});

// Return a transformer that converts the given property to a MomentJS object
const fieldToMoment = (field) => (ev) =>
    Object.assign(shallowClone(ev), {
        [field]: moment(ev[field]),
    });

// Return a transformer that converts the given properties to a MomentJS object
const fieldsToMoments = (...fieldNames) => (ev) =>
    fieldNames.reduce((acc, field) => fieldToMoment(field)(acc), shallowClone(ev));

// Transform the given event to include a durationInHours property
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
