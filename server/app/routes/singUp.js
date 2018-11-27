const db = require("../../models");
const express = require("express");
const router = express.Router();
const HTTPError = require("http-errors");
const constant = require("./constants");


router.post("/", (req, res, next) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;

  db.User.findAll({ where: { email: email } }).then(user => {
    if (user.length >= 1) {
      return next(
        HTTPError.BadRequest(constant.ERROR_EMAIL_EXIST)
      );
    } else {
      db.User.create({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password
      })
        .then(result => {
          res.status(201).json({
            message: constant.USER_CREATED
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        });
    }
  });
});
module.exports = router;
