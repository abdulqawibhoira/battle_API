const config = require('../configs');

const getConnectionString = () => {
    return `mongodb://${config.get('mongodb.username')}:${config.get('mongodb.password')}@${config.get('mongodb.host')}:${config.get('mongodb.port')}/${config.get('mongodb.databaseName')}`;
};

module.exports = { getConnectionString };