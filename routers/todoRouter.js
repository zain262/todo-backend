const express = require('express');
const todoController = require('../controller/todoController');
const authController = require('../controller/authController');

const router = express.Router();

//Route to get all the todo lists for users (only admin route)
router.get(
  '/getAll',
  authController.protect,
  authController.adminAcess,
  todoController.getAll
);

//Route to create another to do item
router.post('/createtodo', authController.protect, todoController.createTodo);

//Route to get to do list for the logged in user
router.get('/getList', authController.protect, todoController.getTodo);

//Route to update the list
router.patch('/updateList', authController.protect, todoController.updateTodo);

module.exports = router;
