module.exports = {
  up: (queryInterface, Sequelize) =>
    Promise.all([
      queryInterface
        .createTable('user_topic', {
          userId: {
            type: Sequelize.UUID,
            references: {
              model: 'user',
              key: 'id',
            },
          },
          topicId: {
            type: Sequelize.UUID,
            references: {
              model: 'topic',
              key: 'id',
            },
          },
          order: {
            type: Sequelize.NUMERIC(),
          },
          createdAt: Sequelize.DATE,
          updatedAt: Sequelize.DATE,
        })
        .then(() =>
          queryInterface.addIndex('user_topic', {
            fields: ['userId', 'topicId'],
            unique: true,
            name: 'user_topic_pkey',
          }),
        ),
    ]),

  down: queryInterface => queryInterface.dropTable('user_topic'),
};
