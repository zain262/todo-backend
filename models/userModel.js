const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

//Create the user model
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  role: {
    required: false,
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
});

//Before saving the user encrypt the password
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
module.exports = mongoose.model('User', userSchema);
