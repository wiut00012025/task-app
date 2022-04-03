const path = require("path");

module.exports.generateID = function () {
    return "_" + Math.random().toString(36).substr(2, 9);
};

const root = path.dirname(
    require.main.filename || process.require.main.filename
);

module.exports.root = root;

module.exports.isValidData = (data) => {
    return (
        data.name.trim() != "" &&
        data.phoneNumber.trim() != "" &&
        data.topic.trim() != ""
    )
};