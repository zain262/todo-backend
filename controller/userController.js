const User = require('../models/userModel');
const Todo = require('../models/todoModel');

exports.createAdmin = async (req, res, next) => {
  const user = {
    username: req.body.username,
    password: req.body.password,
    role: 'admin',
  };
  try {
    const newUser = await User.create(user);

    const newTodo = await Todo.create({
      userid: newUser._id,
      list: [],
    });

    res.status(201).json({
      message: 'sucess',
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};
