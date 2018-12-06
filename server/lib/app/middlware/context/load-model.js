const HTTPError = require('http-errors')
const { param, validationResult } = require('express-validator/check')
const _ = require('lodash')

const ERRNOTFOUND = 'Unable to find the requested entity';
const REGEX = '/api/:modelName/:id';
const VALIDATION = [param('id').exists().isInt()]

const middleware = (req, res, next) => {
  if (!_.has(validationResult(req).mapped(),'id')) {
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
