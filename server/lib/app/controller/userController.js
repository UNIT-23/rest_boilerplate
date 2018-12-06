import HTTPError from "http-errors"
import JWT from "../../modules/jwt"
import constant from "./constants"
import models from "../../models"
import methods from "./Methods"

export const userLogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (methods.Empty(email, password)) {
    return next(HTTPError.BadRequest(constant.ERROR_EMAIL_PASSWORD_REQUIRED));
  }

  const user = await models.User.findOne({ where: { email: email } })
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

  models.Permission.findAll({
    include: [{
      model   : models.Role,
      required: true,
      through : { where: { roleId: user.roleId } }
    }]
  })
    .then(permissions=>{
      const acl = req.app.get('acl')
      const data = {  token: JWT.sign({ userId: user.id }), user };
      
      acl.defineRules(permissions)
      
      res.responsedata = { token: data.token, user: user }
      res.status(201).json({
        message: constant.SUCCESS_EMAIL_VERIFIED,
        data   : data
      });

      return next();
      
    })
    .catch(next)
};

export const userSignup = async (req, res, next) => {
  const { firstname, lastname, email, password, roleId } = req.body

  if (methods.newUser(firstname, lastname, email, password)) {
    return next(HTTPError.BadRequest(constant.ERROR_EMAIL_PASSWORD_REQUIRED));
  }

  const user = await models.User.findAll({ where: { email: email } })
  if (user.length >= 1) {
    res.status(400).json(constant.ERROR_EMAIL_EXIST)
    return next(HTTPError.BadRequest(constant.ERROR_EMAIL_EXIST));
  } 
  try{
    const newUser = await models.User.create({
      firstname,
      lastname ,
      email    ,
      password ,
      roleId
    });
    
    res.status(201).json({
      message: constant.USER_CREATED,
      user   : newUser
    });
  } catch(e){
    res.status(500).json({
      error: e
    });
  }
}

