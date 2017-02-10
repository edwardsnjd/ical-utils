const request = require('request-promise-native');
const ical = require('ical');

// Return a promise for the array of events in the iCal feed at the given URL. 
function getCalendar(url) {
    return request(url)
        .then(ical.parseICS.bind(ical));
}

module.exports = getCalendar;