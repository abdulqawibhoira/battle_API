const convict = require('convict');

// Define a schema
let config = convict({
    env: {
        doc: "The application environment.",
        format: ["production", "development", "staging"],
        default: "development",
        env: "NODE_API_ENV"
    },
    port: {
        doc: "The port to bind. Node server will run on this port.",
        format: "port",
        default: 3000,
        env: "NODE_API_PORT"
    },
    mongodb: {
        host: {
            doc: "Mongodb host to connect to",
            format: "*",
            default: "ds233551.mlab.com"
        },
        port: {
            doc: "Port to connect to",
            format: "port",
            default: 33551
        },
        username: {
            doc: "mongodb username",
            format: "*",
            default: "abdul"
        },
        password: {
            doc: "mongodb password",
            format: "*",
            default: "abdul123"
        },
        databaseName: {
            doc: "mongodb database name",
            format: "*",
            default: "battle_aqb_instarem"
        }
    },
    jwt: {
        secretKey: {
            doc: "Secret Key to generate acces tokens",
            format: "*",
            default: "##battle##",
        },
        expiresIn: {
            doc: "Access token expiry time",
            format: "*",
            default: "180 days",
        },
    }
});

// Load environment dependent configuration
config.loadFile(`./app/configs/${config.get('env')}.json`);

// Perform validation
config.validate({ allowed: 'strict' });

module.exports = config;