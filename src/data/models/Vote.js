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
    userId: {
      type: DataType.UUID,
    },
    submissionId: {
      type: DataType.UUID,
    },
    createdAt: DataType.DATE,
    updatedAt: DataType.DATE,
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
