const tapLogWithPrefix = (prefix) => (obj) => {
    if (prefix) {
        console.log(prefix, obj);
    } else {
        console.log(obj);
    }
    return obj;
};

const tapLog = tapLogWithPrefix();

module.exports = {
    tapLog,
    tapLogWithPrefix,    
};
