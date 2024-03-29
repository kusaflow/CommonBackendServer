const express = require('express');
const router = express.Router();

const { register, login, current } = require('../controllers/loginController');
const validateToken  = require('../middleware/validateTokenHandler');

router.route('/register').post(register);
router.route('/login').post(login);
router.get('/current', validateToken, current);

module.exports = router;