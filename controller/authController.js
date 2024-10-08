const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Todo = require('../models/todoModel');
const { promisify } = require('util');

exports.signup = async (req, res, next) => {
  const userInfo = {
    username: req.body.username,
    password: req.body.password,
  };

  try {
    const newUser = await User.create(userInfo);

    const newTodo = await Todo.create({
      userid: newUser._id,
      list: [],
    });

    const token = jwt.sign(
      { id: newUser._id },
      'LEBRON-LEBRON-LEBRON-LEBRON-23-62',
      {
        expiresIn: '90d',
      }
    );

    res.cookie('jwt', token, {
      httpOnly: true,
      sameSite: 'None',
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      secure: true,
    });

    res.status(201).json({
      message: 'success',
      token,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: 'Please provide both a username and password.',
      });
    }

    const user = await User.findOne({ username }).select('+password');

    if (!user) {
      return res.status(401).json({
        message: 'Incorrect username or password.',
      });
    }

    const compare = await bcrypt.compare(password, user.password);

    if (!compare) {
      return res.status(401).json({
        message: 'Incorrect username or password.',
      });
    }

    const token = jwt.sign(
      { id: user._id },
      'LEBRON-LEBRON-LEBRON-LEBRON-23-62',
      {
        expiresIn: '90d',
      }
    );

    res.cookie('jwt', token, {
      httpOnly: true,
      sameSite: 'None',
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      secure: true,
    });

    res.status(200).json({
      role: user.role,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.protect = async (req, res, next) => {
  let token;

  if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return res.status(401).json({
      message: 'You are not logged in! Please log in to get access.',
    });
  }

  try {
    const decoded = await promisify(jwt.verify)(
      token,
      'LEBRON-LEBRON-LEBRON-LEBRON-23-62'
    );

    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        message: 'The user belonging to this token does not exist.',
      });
    }

    if (!req.body.signup) {
      req.body.userId = decoded.id;
      req.body.username = currentUser.username;
      req.body.role = currentUser.role;
    }

    if (req.body.signup) {
      req.body.role = currentUser.role;
    }

    next();
  } catch (err) {
    return res.status(401).json({
      message: 'Invalid token. Please log in again.',
    });
  }
};

exports.adminAcess = async (req, res, next) => {
  if (req.body.role !== 'admin') {
    return next(
      res.status(401).json({
        message: 'You do not have permission to perform this action',
      })
    );
  }

  next();
};

exports.logout = (req, res, next) => {
  res.cookie('jwt', 'loggedout', {
    httpOnly: true,
    sameSite: 'None',
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    secure: true,
  });

  res.status(200).json({ status: 'success' });
};
