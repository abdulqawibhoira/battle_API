const constants = require('../constants.js');
const jwt = require('../lib/jwtGenerator.js');
const APIResponse = require('../lib/APIResponse.js');
const APIError = require('../lib/APIError.js');
const userModel = require('../models/user.js');

const login = async (req, res, next) => {
    const filter = { username: req.body.username, password: req.body.password }
    const userDetails = await userModel.findOne(filter).lean();
    if (!userDetails) {
        throw new APIError(constants.BAD_REQUEST, "Invalid Username Or Password");
    }
    /** generate Access token on successful login. JWT is used to genarate access token.
    *   access token generated would be passed in "Authorization" header for all the requests which requires user's Authentication.
    *   User ID is stored as a PAYLOAD data of an access token 
    */
    userDetails.accessTokenDetails = jwt.generateJWTToken({
        userId: userDetails['_id'].toString()
    });
    APIResponse.OK(res, userDetails);
}


module.exports = { login };