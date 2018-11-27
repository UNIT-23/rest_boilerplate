const express = require("express");
const router = express.Router();
const HTTPError = require("http-errors");
const bcrypt = require("bcrypt");
const JWT = require("../../modules/jwt");
const constant = require("./constants");
const db = require("../../models");
const _ = require("lodash");

function validPassword(password, newPass) {
  return bcrypt.compareSync(password, newPass);
}
router.post("/", function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (_.isEmpty(email) || _.isEmpty(password)) {
    return next(HTTPError.BadRequest(constant.ERROR_EMAIL_PASSWORD_REQUIRED));
  }

  db.User.findOne({ where: { email: email } })
    .then(user => {
      if (!user) {
        return next(
          HTTPError(400, constant.ERROR_USER_NOT_FOUND, {
            errors: [{ path: "email", message: constant.ERROR_USER_NOT_FOUND }]
          })
        );
      }
      return user;
    })
    .then(user => {
      if (!validPassword(password, user.password)) {
        return next(
          HTTPError(400, constant.ERROR_INCORRECT_PASSWORD, {
            errors: [
              {
                path: "password",
                message: constant.ERROR_INCORRECT_PASSWORD
              }
            ]
          })
        );
      }
      return user;
    })
    .then(user => {
      const payload = { userId: user.id };
      const Token = JWT.sign(payload);
      const data = (res.responseData = { token: Token, user: user });
      res.status(201).json(data);
      return next();
    })
    .catch(next);
});

module.exports = router;
