const summaryMatchesRegex = (re) => (ev) =>
    ev.summary ? re.test(ev.summary) : false;

module.exports = {
    summaryMatchesRegex,
};
