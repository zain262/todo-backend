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

<<<<<<< HEAD
//Route to log out a user
router.get('/logout', authController.logout);
//Route for sign up a user
=======
router.post('/logout', authController.logout);
>>>>>>> 3838e4c6e094333f3e26ab6344de29b7afbd9269
router.post('/signup', authController.signup);
//Route to log in a user
router.post('/login', authController.login);

module.exports = router;
