const router = require('express').Router();
const controllers = require('../controllers');
const asyncWrapper = require('../lib/asyncWrapper.js');

router.post('/login', asyncWrapper(controllers.users.login));

module.exports = router;