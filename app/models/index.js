const fs = require("fs");
const path = require("path");
let models = {};

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(file => {
        let file_name = file.replace(".js", "");
        models[file_name] = require(path.join(__dirname, file));
    });

module.exports = models;