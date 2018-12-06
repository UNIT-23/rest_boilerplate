const REGEX = '/api/:modelName'
const filterToFindOptions = require('./filterToFindOptions')

const middleware = (req, res, next) => {
  const filter = req.query.filter || {}

  req.context.findOptions = filterToFindOptions(filter)

  next()
}

module.exports = server => server.use(REGEX, middleware)

