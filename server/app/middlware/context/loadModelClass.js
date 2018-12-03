const { param, validationResult } = require("express-validator/check");
const models = require("../../../models");
const { flatten, lowerCase, upperCase, has } = require("lodash");
const MODEL_NOT_FOUND = 'Model was not found'

const modelNames = flatten(Object
  .keys(models).map(key=> [lowerCase(key), upperCase(key)]))


const VALIDATION = [
  param("modelName")
    .isAlpha()
    .isIn(modelNames)
];

const middleware = (req, res, next) => {
  const modelName = lowerCase(req.params.modelName);
  if (!has(validationResult(req).mapped(), modelName)) {
    const modelClass = models.lowerCaseModels[modelName];
    if (!modelClass){
      return next(MODEL_NOT_FOUND)
    }
    req.context.modelClass = modelClass
    next()
  } else {
    next()
  }
};

module.exports = server => server.use("/api/:modelName", VALIDATION, middleware)
