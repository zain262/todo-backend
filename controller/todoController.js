const User = require('../models/userModel');
const Todo = require('../models/todoModel');
const mongoose = require('mongoose');

exports.createTodo = async (req, res, next) => {
  try {
    const { userId, todos } = req.body;

    const newTodo = await Todo.create({
      userid: userId,
      list: todos,
    });

    res.status(200).json({
      message: 'sucess',
      data: newTodo,
    });
  } catch (err) {
    res.status(400).json({
      message: err.meesage,
    });
  }
};

exports.getTodo = async (req, res, next) => {
  try {
    const userId = req.body.userId;
    const username = req.body.username;

    const getList = await Todo.findOne({ userid: userId });

    res.status(200).json({
      data: getList,
      username: username,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const userList = await User.find();

    let arr = [];
    for (let i = 0; i < userList.length; i++) {
      const currid = userList[i]._id;

      const temp = await Todo.findOne({
        userid: currid,
      });

      const currObj = {
        username: userList[i].username,
        list: temp.list,
      };
      arr.push(currObj);
    }

    res.status(200).json({
      data: arr,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

exports.createTodo = async (req, res, next) => {
  try {
    const { userId, todos } = req.body;

    const newTodo = await Todo.create({
      userid: userId,
      list: todos,
    });

    res.status(200).json({
      message: 'sucess',
      data: newTodo,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

exports.updateTodo = async (req, res, next) => {
  try {
    const { userId, list } = req.body;

    const updateTodo = await Todo.findOneAndUpdate(
      { userid: userId },
      { list: list },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      message: 'success',
      data: updateTodo,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

exports.getAllTodo = async (req, res, next) => {
  try {
    const userId = req.body.userId;
    const username = req.body.username;

    const getList = await Todo.findOne({ userid: userId });

    res.status(200).json({
      data: getList,
      username: username,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};
