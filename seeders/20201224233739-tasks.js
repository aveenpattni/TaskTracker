'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert("Tasks", [{
      uID: 1,
      title: "Finish Back End",
      description: "Finish all end points and database for Task Tracker",
      priority: 1,
      due: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      uID: 1,
      title: "Finish Front End",
      description: "Add login and task page. Create tasks with a modal. Edit taks with a separeate modal.",
      priority: 2,
      due: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('Tasks', null, {});
  }
};
