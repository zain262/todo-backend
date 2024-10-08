const express = require('express');
const mongoose = require('mongoose');
const userController = require('../controller/userController');
const authController = require('../controller/authController');
const router = express.Router();

router.post(
  '/makeadmin',
  authController.protect,
  authController.adminAcess,
  userController.createAdmin
);

router.get('/logout', authController.logout);
router.post('/signup', authController.signup);
router.post('/login', authController.login);

module.exports = router;
