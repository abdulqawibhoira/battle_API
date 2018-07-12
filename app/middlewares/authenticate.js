const jwt = require('jsonwebtoken');
const APIError = require('../lib/APIError.js');
const config = require('../configs');
const constants = require('../constants.js');

/** 
 * This function returns a middleware function which authenticates the user.
 * @param {boolean} required Boolean parameter to check if access token is required or optional (if false) to access particular API
 * 
 * middleware function verfies user's accesstoken passed in Authorization Header.
 * middleware function sends 401 if access token is expired or invalid
 * 
 * */
const authenticateUser = (required = false) =>
    async (req, res, next) => {
        let accessToken = req.headers.authorization;
        if (required && !accessToken) {
            throw new APIError(constants.UNAUTHORISED, "Invalid access token");
            return;
        }
        if (accessToken) {
            try {
                const tokenDetails = jwt.verify(accessToken, config.get('jwt.secretKey'));
                req.user = tokenDetails;
            } catch (e) {
                throw new APIError(constants.UNAUTHORISED, e.message);
            }
        }
        next();
    };


module.exports = { authenticateUser };