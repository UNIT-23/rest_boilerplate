const HTTPError = require('http-errors')
const { param, validationResult } = require('express-validator/check')
const _ = require('lodash')

const INVALID_ID = 'Id is invalid';
const ERRNOTFOUND = 'Unable to find the requested entity';
const models = require("../../../models");
const lowerCaseModels = _.mapKeys(models, (val, key) => _.lowerCase(key));
const upperCaseModels = _.mapKeys(models, (val, key) => _.upperCase(key));
const modelNames = _.concat(lowerCaseModels, upperCaseModels);
const REGEX = '/api/:modelName/:id';
const VALIDATION = [
  param('modelName').isAlpha().isIn(modelNames),
  param('id')
  .exists()
]

const middleware = (req, res, next) => {
  const modelName = _.lowerCase(req.params.modelName);
  const errors = validationResult(req).mapped()
  if (!_.has(errors, modelName) && !_.has(errors,'id')) {
    req.context = req.context || {}
    req.context.modelClass.findByPk(req.params.id)
      .then((instance) => {
        if (instance) {
          req.context.model = instance
          next()
        } else {
          next(HTTPError.NotFound(ERRNOTFOUND))
        }
      })
  } else {
    next()
  }
}

module.exports = server => server.use(REGEX, VALIDATION, middleware)
