const HTTPError = require('http-errors')
const { param, validationResult } = require('express-validator/check')
const _ = require('lodash')

const INVALID_ID = 'Id is invalid';
const ERRNOTFOUND = 'Unable to find the requested entity';
const models = require("../../../models");
const lowerCaseModels = _.mapKeys(models, (val, key) => _.lowerCase(key));
const upperCaseModels = _.mapKeys(models, (val, key) => _.upperCase(key));
const modelNames = _.concat(lowerCaseModels, upperCaseModels);
const REGEX = '/:modelName/:id';
const VALIDATION = [
  param('modelName').isAlpha().isIn(modelNames),
  param('id')
  .exists()
]

const middleware = (req, res, next) => {
  const modelName = _.lowerCase(req.params.modelName);
  console.log(modelName);
  const errors = validationResult(req).mapped()
  console.log('the id is',req.params.id)
  console.log('this page exec')
  if (!_.has(errors, modelName) && !_.has(errors,'id')) {
      console.log('this middleware calls')
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

module.exports = server => server.use('/api/:modelName/:id', VALIDATION, middleware)
