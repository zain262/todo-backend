const express = require('express');
const todoController = require('../controller/todoController');
const authController = require('../controller/authController');

const router = express.Router();

router.get(
  '/getAll',
  authController.protect,
  authController.adminAcess,
  todoController.getAll
);

router.post('/createtodo', authController.protect, todoController.createTodo);
router.get('/getList', authController.protect, todoController.getTodo);
router.patch('/updateList', authController.protect, todoController.updateTodo);

module.exports = router;
