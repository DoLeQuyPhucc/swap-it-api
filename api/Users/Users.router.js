const express = require('express');
const { login, refreshTokenController, logout , register,update, getAllUsers} = require('./Users.controller');
const router = express.Router();

router.post('/auth', login);
router.post('/users/token', refreshTokenController);
router.post('/users/logout', logout);
router.post('/users/register', register);
router.put('/users/update/:id', update);
router.get('/users', getAllUsers);
module.exports = router;