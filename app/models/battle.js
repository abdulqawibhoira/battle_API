const mongoose = require('mongoose');

const battleSchema = mongoose.Schema({
    "name": String,
    "year": Number,
    "battle_number": Number,
    "attacker_king": String,
    "defender_king": String,
    "attacker_1": String,
    "attacker_2": String,
    "attacker_3": String,
    "attacker_4": String,
    "defender_1": String,
    "defender_2": String,
    "defender_3": String,
    "defender_4": String,
    "attacker_outcome": String,
    "battle_type": String,
    "major_death": Number,
    "major_capture": Number,
    "attacker_size": Number,
    "defender_size": Number,
    "attacker_commander": String,
    "defender_commander": String,
    "summer": String,
    "location": String,
    "region": String,
    "note": String
});

battleSchema.statics.findPlaces = async function ({ limit, skip }) {
    return await this.find().select('-_id location region').limit(limit).skip(skip);
};

battleSchema.statics.search = async function ({ queryParams, limit, skip }) {
    const filter = getSearchFiler(queryParams);
    return await this.find(filter).limit(limit).skip(skip);
};

battleSchema.statics.getDefenderSizeStats = async function () {
    return await this.aggregate()
        .match({ defender_size: { $ne: "" } })
        .group({ _id: null, maxDefenderSize: { $max: '$defender_size' }, minDefenderSize: { $min: '$defender_size' }, avgDefenderSize: { $avg: '$defender_size' } })
        .project('-_id maxDefenderSize minDefenderSize avgDefenderSize');
};

battleSchema.statics.getAttackerOutcome = async function () {
    return await this.aggregate()
        .match({ attacker_outcome: { $ne: "" } })
        .group({ _id: "$attacker_outcome", count: { $sum: 1 } })
        .project('_id count');
};

battleSchema.statics.getDistinctBattleTypes = async function () {
    return await this.distinct('battle_type', { battle_type: { $ne: "" } })
};

battleSchema.statics.getMostActive = async function (param) {
    return await this.aggregate()
        .match({ [param]: { $ne: "" } })
        .group({ _id: `$${param}`, count: { $sum: 1 } })
        .sort({ count: -1 })
        .limit(1)
        .project('_id');
};

const getSearchFiler = (queryParams) => {
    const filter = {};
    for (const param of getAllowedFilterFields()) {
        if (queryParams[param]) {
            if (param == 'king') {
                filter["$or"] = [{ 'attacker_king': queryParams[param] }, { 'defender_king': queryParams[param] }];
            } else {
                filter[param] = queryParams[param];
            }
        }
    }
    return filter;
};

const getAllowedFilterFields = () => {
    return [
        "name",
        "year",
        "king",
        "battle_number",
        "attacker_king",
        "defender_king",
        "attacker_1",
        "attacker_2",
        "attacker_3",
        "attacker_4",
        "defender_1",
        "defender_2",
        "defender_3",
        "defender_4",
        "attacker_outcome",
        "battle_type",
        "major_death",
        "major_capture",
        "attacker_size",
        "defender_size",
        "attacker_commander",
        "defender_commander",
        "summer",
        "location",
        "region",
        "note"
    ]
};

module.exports = mongoose.model('battles', battleSchema);