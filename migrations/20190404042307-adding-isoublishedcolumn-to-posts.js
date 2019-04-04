// 'use strict';
//
// module.exports = {
//   up: (queryInterface, Sequelize) => {
//     /*
//       Add altering commands here.
//       Return a promise to correctly handle asynchronicity.
//
//       Example:
//       return queryInterface.createTable('users', { id: Sequelize.INTEGER });
//     */
//   },
//
//   down: (queryInterface, Sequelize) => {
//     /*
//       Add reverting commands here.
//       Return a promise to correctly handle asynchronicity.
//
//       Example:
//       return queryInterface.dropTable('users');
//     */
//   }
// };



'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // adding a new category column
    return queryInterface.addColumn(
      'posts', // name of the table
      'isPublished',{ // name of the column
        type: Sequelize.BOOLEAN// data type of column
      }
    )

  },

  down: (queryInterface, Sequelize) => {
    // removing category column
    return queryInterface.removeColumn(
      'posts',
      'isPublished'
    )

  }
};
