const HTTPError = require('http-errors')
const UNAUTHORIZED = 'User does not have the required permission'

const checkPermission = (action, model, acl, next)=> {
  if(acl.can(action, model)){
    next()
  }else{
    next(HTTPError.Forbidden(UNAUTHORIZED))
  }
}

export default function(req, res, next){
  const acl = req.app.get('acl')
  const requestMethod = req.route.methods
  const model = req.params.model
  
  if('post' in requestMethod){
    return checkPermission('write', model, acl, next)
  }else if('get' in requestMethod){
    return checkPermission('read', model, acl, next)
  }else if('put' in requestMethod){
    return checkPermission('update', model, acl, next)
  }else if('delete' in requestMethod){
    return checkPermission('delete' in requestMethod)
  }
}