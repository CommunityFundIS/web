module.exports = {
  up: (queryInterface, Sequelize) =>
    Promise.all([
      queryInterface.createTable('topic', {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV1,
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING(255),
        },
        color: {
          type: Sequelize.STRING(255),
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      }),
    ]),

  down: queryInterface => queryInterface.dropTable('topic'),
};
