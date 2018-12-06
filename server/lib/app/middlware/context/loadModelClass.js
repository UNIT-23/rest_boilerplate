import { param, validationResult }from "express-validator/check"
import { lowerCaseModels } from "../../../models"
import { has } from "lodash"
import { isIn } from 'validator'
const MODEL_NOT_FOUND = 'Model was not found'

const lowerCaseModelNames = Object.keys(lowerCaseModels)
const VALIDATION = [
  param("modelName")
    .isAlpha()
    .custom(modelName => isIn(modelName.toLowerCase(), lowerCaseModelNames))
    .withMessage(MODEL_NOT_FOUND)
];

const middleware = (req, res, next) => {
  const modelName = req.params.modelName.toLowerCase()
  
  if (!has(validationResult(req).mapped(), modelName)) {
    const modelClass = lowerCaseModels[modelName];
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
