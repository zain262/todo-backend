const mongoose = require('mongoose');
const { Schema } = mongoose;

const todoSchema = new Schema({
  userid: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  list: [
    {
      id: { type: Number, default: () => Date.now() },
      text: { type: String, required: true },
      desc: { type: String, required: true },
      done: { type: Boolean, default: false },
      fav: { type: Boolean, default: false },
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model('Todo', todoSchema);
