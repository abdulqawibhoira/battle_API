const router = require('express').Router();
const controllers = require('../controllers');
const asyncWrapper = require('../lib/asyncWrapper.js');

// Login API
router.post('/user/login', asyncWrapper(controllers.users.login));

module.exports = router;