const express = require('express')
const router = express.Router()
const { has, toLower, find, isEmpty, extend } = require('lodash')
const HTTPError = require('http-errors')
const models = require("../../models");
const { param, validationResult } = require('express-validator/check')
const { isIn } = require('validator')
const MODEL_NOT_FOUND = 'Model was not found'
const lowerCaseModelNames = Object.keys(models.lowerCaseModels)
const auth = require('../middlware/check-auth')
const modelIdValid = param('id').exists().isInt()
const modelNameValid = param('modelName').isAlpha()
  .custom(modelName => isIn(modelName.toLowerCase(), lowerCaseModelNames))
  .withMessage(MODEL_NOT_FOUND)


// [READ]
// GET A Model Object
router
  .get('/:modelName/:id',[modelNameValid, modelIdValid], (req, res, next) => {
    if (!has(validationResult(req).mapped(), 'modelName') &&
     (!has(validationResult(req).mapped(), 'id'))) {
      res.responseData = req.context.model.toJSON()
      res.send(res.responseData)
      next()
    } else {
      next()
    }
  })

// [READ] - RELATION
// GET A Model's Relation
router.get('/:modelName/:id/:relationName', [
  modelNameValid, modelIdValid, param('relationName').isAlpha()
], (req, res, next) => {
  if (!has(validationResult(req).mapped(), 'modelName') &&
  (!has(validationResult(req).mapped(), 'id')) &&
  (!has(validationResult(req).mapped(), 'relationName'))) {
    const model = req.context.model
    const relationName = toLower(req.params.relationName)
    const association = find(
      req.context.modelClass.associations,
      (val, key) => toLower(key) === relationName
    )

    if (!association) {
      return next()
    }

    model[association.accessors.get](req.context.findOptions)
      .then(data => {
        if (!data) {
          return next()
        }

        res.responseData = Array.isArray(data)
          ? data.map(model => model.toJSON())
          : data.toJSON()
        next()
      })
      .catch(err => handleAuthError(err, next))
  } else {
    next()
  }
})

// [READ] - FINDALL
// GET Filtered Records
router.get('/:modelName/list', [modelNameValid], (req, res, next) => {
  if (!has(validationResult(req).mapped(), 'modelName')) {
    
    req.context.modelClass.findAll(req.context.findOptions)
      .then(data => {
        res.responseData = data.map(model => model.toJSON())
        return next()
      })
      .catch(err => handleAuthError(err, next))
  } else {
    next()
  }
})

// [READ] - COUNT
// GET Filtered Records
router.get('/:modelName/count', [modelNameValid], (req, res, next) => {
  if (!has(validationResult(req).mapped(), 'modelName')) {
    req.context.modelClass.count(req.context.findOptions)
      .then(count => {
        res.responseData = { count }
        next()
      })
      .catch(err => handleAuthError(err, next))
  } else {
    next()
  }
})

// [CREATE]
// POST A Model Object
router.post('/:modelName', [modelNameValid, auth], (req, res, next) => {
  if (!has(validationResult(req).mapped(), 'modelName')) {
    const attributes = req.body || {}
    const modelClass = req.context.modelClass
    const model = modelClass.build(attributes)

    const options = { context: req.context }
    if (!isEmpty(req.context.options)) {
      extend(options, req.context.options)
    }

    // AuthManager.canUserCreateModel(req.context.user, model)
    //   .then(() =>
    modelClass.create(attributes, options)
      //  )
      .then(instance => {
        res.responseData = instance.toJSON()
        next()
      })
      .catch(err => handleAuthError(err, next))
  } else {
    next()
  }
})

// [UPDATE]
// PUT A Model Object
router
  .put('/:modelName/:id', [modelNameValid, modelIdValid, auth],
    (req, res, next) => {
      if (!has(validationResult(req).mapped(), 'modelName') &&
      (!has(validationResult(req).mapped(), 'id'))) {
        const attributes = req.body || {}
        const model = req.context.model

        // AuthManager.canUserUpdateModel(req.context.user, model)
        //   .then(() => 
        model.update(attributes, { context: req.context })
        // )
          .then(() => {
            res.responseData = model.toJSON()
            next()
          })
          .catch(err => handleAuthError(err, next))
      } else {
        next()
      }
    })

// [PATCH]
// PATCH A Model Object
router.patch('/:modelName/:id', [modelNameValid, modelIdValid, auth],
  (req, res, next) => {
    if (!has(validationResult(req).mapped(), 'modelName') &&
      (!has(validationResult(req).mapped(), 'id'))) {
      const attributes = req.body.patchFields || {}
      const model = req.context.model

      // AuthManager.canUserPatchModel(
      //   req.context.user,
      //   model,
      //   req.body.patchPermission,
      //   req.body.patchFields
      // )
      //   .then(() =>
      model.updateAttributes(attributes, { context: req.context })
      // )
        .then(() => {
          res.responseData = model.toJSON()
          next()
        })
        .catch(err => handleAuthError(err, next))
    } else {
      next()
    }
  })

// [DELETE]
// DELETE A Model Object
router.delete('/:modelName/:id', [modelNameValid, modelIdValid, auth],
  (req, res, next) => {
    if (!has(validationResult(req).mapped(), 'modelName') &&
    (!has(validationResult(req).mapped(), 'id'))) {
      const model = req.context.model
      // AuthManager.canUserDeleteModel(req.context.user, model)
      //   .then(() => 
      model.destroy({ context: req.context })
        // )
        .then(() => {
          res.responseData = { message: 'Model deleted successfully' }
          next()
        })
        .catch(err => handleAuthError(err, next))
    } else {
      next()
    }
  })

function handleAuthError (err, next) {
  if (err.code && err.code === 403) {
    next(HTTPError.Forbidden(err.message))
  } else {
    next(err)
  }
}

module.exports = router
