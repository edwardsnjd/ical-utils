const ical = require('ical');

// Return a promise for the array of events in the iCal feed at the given path.
function getCalendarFile(path) {
    return new Promise((resolve, reject) => {
        try {
            resolve(ical.parseFile(path))
        } catch (e) {
            reject(e)
        }
    }
}

module.exports = getCalendarFile;
