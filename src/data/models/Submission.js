import DataType from 'sequelize';
import Model from '../db';

const Submission = Model.define(
  'submission',
  {
    id: {
      type: DataType.UUID,
      defaultValue: DataType.UUIDV1,
      primaryKey: true,
    },
    name: {
      type: DataType.STRING(),
      allowNull: false,
    },
    email: {
      type: DataType.STRING(),
      validate: { isEmail: true },
      allowNull: false,
    },
    phone: {
      type: DataType.STRING(),
      allowNull: false,
    },
    date: {
      type: DataType.DATE(),
      allowNull: false,
    },
    summary: {
      type: DataType.TEXT(),
      allowNull: false,
    },
    description: {
      type: DataType.TEXT(),
      allowNull: false,
    },
    askAmount: {
      type: DataType.NUMERIC(),
      allowNull: false,
    },
    totalCost: {
      type: DataType.NUMERIC(),
      allowNull: false,
    },
    decidedOn: {
      type: DataType.DATE(),
      allowNull: true,
    },
    result: {
      type: DataType.ENUM('accepted', 'rejected'),
      allowNull: true,
    },
  },
  {
    indexes: [{ fields: ['id'] }],
  }
);

export default Submission;
