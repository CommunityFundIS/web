// Add fields to user table
module.exports = {
  up: (queryInterface, Sequelize) =>
    Promise.all([
      queryInterface.addColumn('user', 'image', {
        type: Sequelize.STRING(255),
      }),
      queryInterface.addColumn('user', 'title', {
        type: Sequelize.STRING(255),
      }),
      queryInterface.addColumn('user', 'isPublic', {
        type: Sequelize.BOOLEAN,
      }),
    ]),

  down: queryInterface =>
    Promise.all([
      queryInterface.removeColumn('user', 'image'),
      queryInterface.removeColumn('user', 'title'),
      queryInterface.removeColumn('user', 'isPublic'),
    ]),
};
