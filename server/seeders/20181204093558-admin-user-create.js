'use strict';
import models, { loading } from '../lib/models'

module.exports = {
  up: (queryInterface, Sequelize) =>  
    loading.then(models=> models.Role.findOrCreate({
      where: {
        name: 'Super Admin',
      }
    })
      .spread(role=>  {
        return models.User.findOrCreate({
          where: {
            firstname: 'super',
            lastname : 'admin',
            email    : 'admin@unit23.tech',
            roleId   : role.id
          } ,
          defaults: { password: 'password' }
        })
      })
    ),

  down: (queryInterface, Sequelize) => {
    return loading.then(models=> models.User.destroy({ 
      where: { email: 'admin@unit23.tech' }
    }))
  }
};