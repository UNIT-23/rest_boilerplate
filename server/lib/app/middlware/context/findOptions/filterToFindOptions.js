const  replaceWhereOperators  =  require('./replaceWhereOperators')
const { isEmpty, isUndefined } = require('lodash')

module.exports =   filter => {
  const result = {};

  if (!isEmpty(filter)) {
    filter = JSON.parse(filter)
    
    Object.keys(filter).forEach(key => {
      if (!isUndefined(filter[key])) {
        if (key === 'limit') {
          result.limit = parseInt(filter[key], 10);
        } else if (key === 'offset') {
          result.offset = parseInt(filter[key], 10);
        } else if (key === 'order') {
          if (filter[key].indexOf('reverse:') === 0) {
            result.order = [[filter[key].substring(8), 'DESC']];
          } else {
            result.order = [[filter[key], 'ASC']];
          }
        } else if (key === 'where') {
          result.where = replaceWhereOperators(filter.where);
        }
      }
    });
  }
  
  return result;
}