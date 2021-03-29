'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return Promise.all([
     queryInterface.addColumn(
       "Users",
       "photoUrl",
       Sequelize.STRING
     )
   ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      "Users",
      "photoUrl"
    )
  }
};
