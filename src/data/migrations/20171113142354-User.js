// Add fields to user table
module.exports = {
  up: (queryInterface, Sequelize) =>
    Promise.all([
      queryInterface.addColumn('user', 'verified', {
        type: Sequelize.BOOLEAN,
      }),
      queryInterface.addColumn('user', 'resetToken', {
        type: Sequelize.STRING(255),
      }),
      queryInterface.addColumn('user', 'verificationToken', {
        type: Sequelize.STRING(255),
      }),
    ]),

  down: queryInterface =>
    Promise.all([
      queryInterface.removeColumn('user', 'verified'),
      queryInterface.removeColumn('user', 'resetToken'),
      queryInterface.removeColumn('user', 'verificationToken'),
    ]),
};
