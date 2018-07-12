const constants = require('../constants.js');
const jwt = require('../lib/jwtGenerator.js');
const APIResponse = require('../lib/APIResponse.js');
const APIError = require('../lib/APIError.js');
const battleModel = require('../models/battle.js');

const list = async (req, res, next) => {
    const limit = getLimit(req.query.limit);
    const skip = getSkip(req.query.skip);
    const places = await battleModel.findPlaces({ limit, skip });
    APIResponse.OK(res, { places });
};

const count = async (req, res, next) => {
    const battlesCount = await battleModel.count();
    APIResponse.OK(res, { battlesCount });
};

const stats = async (req, res, next) => {

};

const search = async (req, res, next) => {
    const limit = getLimit(req.query.limit);
    const skip = getSkip(req.query.skip);
    const battles = await battleModel.search({ queryParams: req.query, limit, skip });
    APIResponse.OK(res, { battles });
};

const getLimit = (limit) => {
    return limit ? parseInt(limit) || constants.DEFAULT_LIMIT : constants.DEFAULT_LIMIT;
};

const getSkip = (skip) => {
    return skip ? parseInt(skip) || constants.DEFAULT_SKIP : constants.DEFAULT_SKIP;
};


module.exports = { list, count, stats, search };