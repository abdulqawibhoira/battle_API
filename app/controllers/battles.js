const constants = require('../constants.js');
const jwt = require('../lib/jwtGenerator.js');
const APIResponse = require('../lib/APIResponse.js');
const APIError = require('../lib/APIError.js');
const battleModel = require('../models/battle.js');
const _ = require('lodash');

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
    const [defenderSizeStats, attackerOutcome, battle_types,
        MostActiveAttackerKing, MostActiveDefenderKing, MostActiveRegion, MostActiveName] = await Promise.all([
            battleModel.getDefenderSizeStats(),
            battleModel.getAttackerOutcome(),
            battleModel.getDistinctBattleTypes(),
            battleModel.getMostActive('attacker_king'),
            battleModel.getMostActive('defender_king'),
            battleModel.getMostActive('region'),
            battleModel.getMostActive('name')
        ]);
    APIResponse.OK(res, getStatsResponse({ defenderSizeStats, attackerOutcome, battle_types, MostActiveAttackerKing, MostActiveDefenderKing, MostActiveRegion, MostActiveName }));
};

const search = async (req, res, next) => {
    const limit = getLimit(req.query.limit);
    const skip = getSkip(req.query.skip);
    const battles = await battleModel.search({ queryParams: req.query, limit, skip });
    APIResponse.OK(res, { battles });
};

const getStatsResponse = ({ defenderSizeStats, attackerOutcome, battle_types, MostActiveAttackerKing, MostActiveDefenderKing, MostActiveRegion, MostActiveName }) => {
    return {
        most_active: {
            attacker_king: _.get(MostActiveAttackerKing, '[0]_id', null),
            defender_king: _.get(MostActiveDefenderKing, '[0]_id', null),
            region: _.get(MostActiveRegion, '[0]_id', null),
            name: _.get(MostActiveName, '[0]_id', null)
        },
        attacker_outcome: getAttackerOutcomeResponse(attackerOutcome),
        battle_types,
        defender_size: {
            average: _.get(defenderSizeStats, '[0].avgDefenderSize', null),
            min: _.get(defenderSizeStats, '[0].minDefenderSize', null),
            max: _.get(defenderSizeStats, '[0].maxDefenderSize', null)
        }
    }
};

const getAttackerOutcomeResponse = (attackerOutcome) => {
    const attackerOutcomeResponse = {};
    for (const outcome of attackerOutcome) {
        attackerOutcomeResponse[outcome._id] = outcome.count;
    }
    return attackerOutcomeResponse;
};

const getLimit = (limit) => {
    return limit ? parseInt(limit) || constants.DEFAULT_LIMIT : constants.DEFAULT_LIMIT;
};

const getSkip = (skip) => {
    return skip ? parseInt(skip) || constants.DEFAULT_SKIP : constants.DEFAULT_SKIP;
};


module.exports = { list, count, stats, search };