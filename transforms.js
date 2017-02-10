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
const dateToMoment = (field) => (ev) =>
    Object.assign(shallowClone(ev), {
        [field]: moment(ev[field]),
    });

// Return a transformer that converts the given properties to a MomentJS object
const datesToMoments = (...fieldNames) => (ev) =>
    fieldNames.reduce((acc, field) => dateToMoment(field)(acc), shallowClone(ev));

// Transform the given event to include a durationInHours property
const addDurationInHours = (ev) =>
    Object.assign(shallowClone(ev), {
        durationInHours: getDuration(ev) / MS_PER_HOUR,
    });

const getDuration = (ev) =>
    ev.end - ev.start;

// Return a transformer that converts the given date property to an ISO 8601 string
const dateToIso = (field) => (ev) =>
    Object.assign(shallowClone(ev), {
        [field]: ev[field].toISOString(),
    });

// Return a transformer that converts the given date properties to an ISO 8601 string
const datesToIso = (...fieldNames) => (ev) =>
    fieldNames.reduce((acc, field) => dateToIso(field)(acc), shallowClone(ev));

// Return a transformer that converts the given date property to the given format string
const dateToFormat = (format, field) => (ev) => {
    return Object.assign(shallowClone(ev), {
        [field]: moment(ev[field]).format(format),
    });
}

// Return a transformer that converts the given date properties to the given format string
const datesToFormat = (format, ...fieldNames) => (ev) =>
    fieldNames.reduce((acc, field) => dateToFormat(format, field)(acc), shallowClone(ev));

module.exports = {
    selectSummary,
    dateToMoment,
    datesToMoments,
    addDurationInHours,
    dateToIso,
    datesToIso,
    dateToFormat,
    datesToFormat,
};
