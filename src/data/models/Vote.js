import DataType from 'sequelize';
import Model from '../db';
import User from './User';
import Submission from './Submission';

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
  }
);

Submission.hasMany(Vote, { as: 'Votes' });
Vote.belongsTo(Submission);
Vote.belongsTo(User);

export default Vote;
