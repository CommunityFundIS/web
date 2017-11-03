import DataType from 'sequelize';
import Model from '../db';

const Vote = Model.define(
  'vote',
  {
    id: {
      type: DataType.UUID,
      defaultValue: DataType.UUIDV1,
      primaryKey: true,
    },
    comment: {
      type: DataType.TEXT(),
      allowNull: true,
    },
    result: {
      type: DataType.ENUM('accepted', 'rejected'),
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['submissionId', 'userId'],
      },
    ],
  },
);

export default Vote;
