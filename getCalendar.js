const request = require('request-promise-native');
const ical = require('ical');

function getCalendar(url) {
    return request(url)
        .then(ical.parseICS.bind(ical));
}

module.exports = getCalendar;