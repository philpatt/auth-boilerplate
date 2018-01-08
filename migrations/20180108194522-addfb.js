'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    //Add columns facebookId and facebookToken
    //return paramaters are specifiying (table, column, data type)
    return queryInterface.addColumn('users', 'facebookId', Sequelize.STRING).then(function(){
      return queryInterface.addColumn('users', 'facebookToken', Sequelize.STRING)
    });
  },

  down: (queryInterface, Sequelize) => {
    //remove columns facebookId and facebookToken
    //return paramaters are specifiying (table, column)
     return queryInterface.removeColumn('users', 'facebookId').then(function(){
      return queryInterface.removeColumn('users', 'facebookToken')
    });
  }
};
