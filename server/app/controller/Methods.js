const _ = require("lodash");
const bcrypt = require("bcrypt");

exports.validPassword = (password, newPass) => {
  return bcrypt.compareSync(password, newPass);
};
exports.Empty = function(email, password) {
  if (_.isEmpty(email) || _.isEmpty(password)) {
    return true;
  }
  return false;
};

exports.newUser = (firstname, lastname, email, password) => {
  if (
    _.isEmpty(firstname) ||
    _.isEmpty(lastname) ||
    _.isEmpty(email) ||
    _.isEmpty(password)
  ) {
    return true;
  }
  return false;
};
