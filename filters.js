// Return a predicate that passes events where the summary matches the
// given RegExp
const summaryMatchesRegex = (re) => (ev) =>
    ev.summary ? re.test(ev.summary) : false;

module.exports = {
    summaryMatchesRegex,
};
