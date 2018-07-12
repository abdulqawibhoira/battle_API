const router = require('express').Router();
const controllers = require('../controllers');
const asyncWrapper = require('../lib/asyncWrapper.js');
const { authenticateUser } = require('../middlewares/authenticate');

// Login API
router.post('/login', asyncWrapper(controllers.users.login));

// List API
router.get('/list', asyncWrapper(authenticateUser()), asyncWrapper(controllers.battles.list));

// Count API
router.get('/count', asyncWrapper(authenticateUser()), asyncWrapper(controllers.battles.count));

// Stats API
router.get('/stats', asyncWrapper(authenticateUser()), asyncWrapper(controllers.battles.stats));

// Search API
router.get('/search', asyncWrapper(authenticateUser()), asyncWrapper(controllers.battles.search));

module.exports = router;