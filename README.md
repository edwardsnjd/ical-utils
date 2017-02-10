ical-utils
==========

A tiny collection of helpers for obtaining and processing iCal feeds in JS.

Usage
=====

This isn't currently published to NPM but you can require it by using a Git url style reference in your package.json:

```
npm install --save https://github.com/edwardsnjd/ical-utils
```

Then require and use the utils:

```js
const {map,filter} = require('lodash/fp');
const {filters,transforms,getCalendar,utils} = require('ical-utils');

const CALENDAR_URL = 'http://foo/some-public-ical-url.ics';

icalUtils.getCalendar(CALENDAR_URL)
    .then(filter(filters.summaryMatchesRegex(/^Interesting/i)))
    .then(map(transforms.selectSummary))
    .then(map(transforms.fieldsToMoments('start', 'end')))
    .then(map(transforms.addDurationInHours))
    .then(utils.tapLog);
```