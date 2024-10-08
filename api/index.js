const express = require('express');
const mongoose = require('mongoose');
const app = express();
const userRouter = require('../routers/userRouter');
const todoRouter = require('../routers/todoRouter');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const compression = require('compression');

app.use(compression());

app.use(
  cors({
    origin: 'https://todo-front-end-beta.vercel.app/login',
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

const DB =
  'mongodb+srv://Zain262:DFmwEFTe5!LhLGb@cluster0.wetna.mongodb.net/todo?retryWrites=true&w=majority&appName=Cluster0';

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB CONNECTION SUCCESSFUL');
  })
  .catch((err) => {
    console.error('DB CONNECTION ERROR:', err);
  });

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'hello',
  });
});

app.use('/api/v1/user', userRouter);
app.use('/api/v1/todo', todoRouter);

module.exports = app;
