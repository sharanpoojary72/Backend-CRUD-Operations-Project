const express = require('express');


const router = express();

const authControllers = require('../controllers/authControllers');

router.get('/signup', authControllers.signUpGet)


router.post('/signup', authControllers.signUpPost);

router.get('/login', authControllers.loginGet)

router.post('/login', authControllers.loginPost);

module.exports = router;