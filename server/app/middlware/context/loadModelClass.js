const { param, validationResult } = require("express-validator/check");
const models = require("../../../models");
const _ = require("lodash");

const lowerCaseModels = _.mapKeys(models, (val, key) => _.lowerCase(key));
const upperCaseModels = _.mapKeys(models, (val, key) => _.upperCase(key));
const modelNames = _.concat(lowerCaseModels, upperCaseModels);

const VALIDATION = [
  param("modelName")
    .isAlpha()
    .isIn(modelNames)
];

const middleware = (req, res, next) => {
  const modelName = _.lowerCase(req.params.modelName);
  if (!_.has(validationResult(req).mapped(), modelName)) {
    const modelClass = lowerCaseModels[modelName];
    if (!modelClass){
      return next('model not found')
    }
    req.context.modelClass = modelClass
    next()
  }
  else {
    next()
  }
};

module.exports = server => server.use("/api/:modelName", VALIDATION, middleware);
