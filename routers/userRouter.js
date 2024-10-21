const express = require('express');
const mongoose = require('mongoose');
const userController = require('../controller/userController');
const authController = require('../controller/authController');
const router = express.Router();

//Route to create a new admin
router.post(
  '/makeadmin',
  authController.protect,
  authController.adminAcess,
  userController.createAdmin
);

//Route to log out a user
router.get('/logout', authController.logout);
//Route for sign up a user
router.post('/signup', authController.signup);
//Route to log in a user
router.post('/login', authController.login);

module.exports = router;
