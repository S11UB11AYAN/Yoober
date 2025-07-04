const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {expiresIn: '24h'});
  return token;
}

userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
}

const User = mongoose.model("User", userSchema);

module.exports = User;
