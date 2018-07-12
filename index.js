const app = require('express')();
const config = require('./app/configs');
const APIResponse = require('./app/lib/APIResponse');
const bodyParser = require('body-parser');
const routes = require('./app/routes');
const mongoose = require('mongoose');
const cors = require('./app/middlewares/cors');
const mongoConnection = require('./app/lib/mongoConnection');
const constants = require('./app/constants');

// ENV
console.log("ENV --> " + config.get('env'));

// parse application/json
app.use(bodyParser.json());

//Enable CORS
app.use(cors);

// API Routes
app.use(routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    APIResponse.ERROR(res, constants.NOT_FOUND, new Error("Not Found"));
});

//connect mongodb
mongoose.connect(mongoConnection.getConnectionString(), { useNewUrlParser: true });

// exit process if connection failed
mongoose.connection.on('error', () => {
    console.log("Mongo Db Connection Failed")
    process.exit(1);
});

// error handler
app.use(function (err, req, res, next) {
    if (!err.htttpStatusCode && config.get('env') == "production") {
        err.message = constants.INTERNAL_SERVER_ERROR_MESSAGE;
    }
    const status = err.htttpStatusCode || constants.INTERNAL_SERVER_ERROR;
    APIResponse.ERROR(res, status, err);
});

app.listen(process.env.PORT || config.get('port'));
module.exports = app;
