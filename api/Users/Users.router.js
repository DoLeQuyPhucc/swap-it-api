const express = require('express');
const { login, refreshTokenController, logout , register,update} = require('./Users.controller');
const router = express.Router();

router.post('/users/login', login);
router.post('/users/token', refreshTokenController);
router.post('/users/logout', logout);
router.post('/users/register', register);
router.put('/users/update/:id', update);
module.exports = router;