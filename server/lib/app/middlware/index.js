export default function(server) {
  require("./context")(server)
}

export { default as tokenAuth } from './check-auth'
export { default as permsissionAuth } from './check-permission'
