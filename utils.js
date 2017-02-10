// Build a logging function (with an optional prefix) that
// returns the logged object unaltered.  This is handy for
// quickly examining the object in the middle of a chain of
// operations.
const tapLogWithPrefix = (prefix) => (obj) => {
    if (prefix) {
        console.log(prefix, obj);
    } else {
        console.log(obj);
    }
    return obj;
};

// A logging function that returns the logged object unaltered.
// This is handy for quickly examining the object in the middle
// of a chain of operations.
const tapLog = tapLogWithPrefix();

module.exports = {
    tapLog,
    tapLogWithPrefix,    
};
