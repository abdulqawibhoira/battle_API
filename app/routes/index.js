const fs = require("fs");
const path = require("path");
const router = require('express').Router();

const getAllRouters = dir => {
    let routers = {};
    fs
        .readdirSync(dir)
        .filter(file => {
            return (file.indexOf(".") !== 0) && (file !== "index.js");
        })
        .forEach(file => {
            let file_name = file.replace(".js", "");
            routers[file_name] = require(path.join(dir, file));
        });
    return routers;
}

const allRouters = getAllRouters(__dirname);

router.use('/v1', allRouters.v1);

module.exports = router;