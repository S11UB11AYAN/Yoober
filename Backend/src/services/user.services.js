const User = require('../models/user.models');

module.exports.createUser = async ({
  firstname, lastname, email, password
}) => {
  if (!firstname || !lastname || !email || !password) {
    throw new Error('All fields are required');
  }

  const newUser = User.create({
    fullname: {
      firstname,
      lastname
    },
    email,
    password
  })
  return newUser;
}
