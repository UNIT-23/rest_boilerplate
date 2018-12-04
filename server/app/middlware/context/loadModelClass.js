const { param, validationResult } = require("express-validator/check");
const models = require("../../../models");
const { has } = require("lodash");
const MODEL_NOT_FOUND = 'Model was not found'
const { isIn } = require('validator')

const lowerCaseModelNames = Object.keys(models.lowerCaseModels)
const VALIDATION = [
  param("modelName")
    .isAlpha()
    .custom(modelName => isIn(modelName.toLowerCase(), lowerCaseModelNames))
    .withMessage(MODEL_NOT_FOUND)
];

const middleware = (req, res, next) => {
  const modelName = req.params.modelName.toLowerCase()
  
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
