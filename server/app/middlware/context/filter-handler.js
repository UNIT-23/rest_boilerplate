// const _ = require('lodash')
// const HTTPError = require('http-errors')
// const primaryModels = rootRequire('main').models.primary
// const lowerCaseModels = Object.keys(rootRequire('main').models.primaryLowerCase)
// const upperCaseModels = Object.keys(rootRequire('main').models.primary)

// const modelNames = _.concat(lowerCaseModels, upperCaseModels)

// const { param, validationResult } = require('express-validator/check')

// const ERROR_FILTER = 'Include filter must be a type of Array'
// const ERROR_RELATION = 'Invalid relational model in include filter'

// const REGEX = '/api/:modelName'
// const VALIDATION = [
//   param('modelName').isAlpha().isIn(modelNames)
// ]

// const replaceModelNameToModelClass = (include, next) => {
//   if (!_.isArray(include)) {
//     return next(HTTPError.BadRequest(ERROR_FILTER))
//   }

//   _.each(include, (relation, i) => {
//     if (!primaryModels[relation && relation.model] &&
//       !primaryModels[relation]) {
//       return next(HTTPError.BadRequest(ERROR_RELATION))
//     }

//     if (_.isObject(relation)) {
//       include[i] = _.extend(include[i], {
//         model: primaryModels[relation.model]
//       })

//       if (relation.include) {
//         return replaceModelNameToModelClass(relation.include, next)
//       }
//     } else {
//       include[i] = primaryModels[relation]
//     }
//   })
// }

// const middleware = (req, res, next) => {
//   if (!_.has(validationResult(req).mapped(), 'modelName')) {
//     let filter = req.query.filter || req.query.options || {}
//     if (!_.isEmpty(filter)) {
//       filter = JSON.parse(filter)
//     }

//     if (filter.order) {
//       _.each(filter.order, (order) => {
//         if (order.length === 3) {
//           order[0] = primaryModels[order[0]]
//         }
//       })
//     }

//     if (filter.include) {
//       replaceModelNameToModelClass(filter.include, next)
//     }

//     req.query.options ? req.context.options = filter
//     : req.context.filter = filter
//     next()
//   } else {
//     next()
//   }
// }

// module.exports = server => server.use(REGEX, VALIDATION, middleware)

