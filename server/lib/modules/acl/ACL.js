import { AbilityBuilder } from '@casl/ability'

export default class ACL {
  constructor(){
    this.acl = null
  }
  defineRules(permissions, role){
    this.acl = AbilityBuilder.define((can, cannot) => {
      permissions.forEach(permission=>{
        can(permission.action, permission.model)
      })
    })
  }
  can(action = '', model = ''){
    return this.acl.can(action.toUpperCase(), model.toUpperCase())
  }
}