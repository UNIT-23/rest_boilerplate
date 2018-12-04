const HTTPError = require("http-errors");
const JWT = require("../../modules/jwt");
const constant = require("./constants");
const db = require("../../models");
const methods = require("./Methods");

exports['user_login'] = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (methods.Empty(email, password)) {
    return next(HTTPError.BadRequest(constant.ERROR_EMAIL_PASSWORD_REQUIRED));
  }

  const user = await db.User.findOne({ where: { email: email } })
  if (!user) {
    return next(
      HTTPError(400, constant.ERROR_USER_NOT_FOUND, {
        errors: [{ path: "email", message: constant.ERROR_USER_NOT_FOUND }]
      })
    );
  }
  if (!methods.validPassword(password, user.password)) {
    return next(
      HTTPError(400, constant.ERROR_INCORRECT_PASSWORD, {
        errors: [
          {
            path   : "password",
            message: constant.ERROR_INCORRECT_PASSWORD
          }
        ]
      })
    );
  }

      try {
        const payload = { userId: user.id };
        const Token = JWT.sign(payload);
        res.responsedata = { token: Token, user: user }
        const data = { token: Token, user: user };
        res.status(201).json({
          message: constant.SUCCESS_EMAIL_VERIFIED,
          data: data
        });
        return next();
      }
     catch(e){
       next(e)
     }
};

exports['user_signUp'] = async (req, res, next) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;

  if (methods.newUser(firstname, lastname, email, password)) {
    return next(HTTPError.BadRequest(constant.ERROR_EMAIL_PASSWORD_REQUIRED));
  }

   const user = await db.User.findAll({ where: { email: email } })
    if (user.length >= 1) {
      res.status(400).json(constant.ERROR_EMAIL_EXIST)
      return next(HTTPError.BadRequest(constant.ERROR_EMAIL_EXIST));
    } 
    try{
      const newUser = await db.User.create({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password
      });
      res.status(201).json({
        message: constant.USER_CREATED,
        user:newUser
      });
    }
    catch(e){
      res.status(500).json({
        error: e
      });
    }
  }

