const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, 'First name must be atleast 3 characters long']
    },
    lastname: {
      type: String,
      required: true,
      minlength: [3, 'First name must be atleast 3 characters long']
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, 'Email must be atleast 5 characters long']
  },
  password: {
    type: String,
    required: true,
    password: false
  },
  socketId: {
    type: String
  }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
