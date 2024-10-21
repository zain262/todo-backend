const User = require('../models/userModel');
const Todo = require('../models/todoModel');
const mongoose = require('mongoose');

exports.createTodo = async (req, res, next) => {
  try {
    const { userId, todos } = req.body;

    //get user id and the to do item from the body
    const newTodo = await Todo.create({
      userid: userId,
      list: todos,
    });
    //Create a new to do list for the user

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
    //Get the users id from the body (set by protect)

    //Find the list based on the user id and return it
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
    // ADMIN ROUTE finds all the users and finds all the lists for those users
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

    //Structure the out put so that each todo list has a user

    res.status(200).json({
      data: arr,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

exports.updateTodo = async (req, res, next) => {
  try {
    //Get the user id and the new list
    const { userId, list } = req.body;

    //Update the list by finding the list pertaining to the user and updating the list content
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
    //Get the users params from body
    const userId = req.body.userId;
    const username = req.body.username;

    const getList = await Todo.findOne({ userid: userId });
    //Get the todo list for the user and send it back as a response
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
