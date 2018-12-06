'use strict';
import models, { loading } from '../lib/models'
import { flatten, lowerCase, map } from 'lodash'
const actions = ['read', 'write', 'update', 'delete']

module.exports = {
  up: (queryInterface, Sequelize) => {
    return loading.then(models => {
      return models.Permission
        .bulkCreate(flatten(map(models, model=> actions.map(action=>({
          model      : model.name,
          action     : action,
          description: `Can ${action} a ${lowerCase(model.name)}`,
        })))));
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Permission', null, {});
  }
};
