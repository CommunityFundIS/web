import DataType from 'sequelize';
import Model from '../db';

const Attending = Model.define(
  'attending',
  {
    id: {
      type: DataType.UUID,
      defaultValue: DataType.UUIDV1,
      primaryKey: true,
    },
    eventId: {
      type: DataType.UUID,
    },
    userId: {
      type: DataType.UUID,
    },
    status: {
      type: DataType.NUMERIC,
    },
    createdAt: DataType.DATE,
    updatedAt: DataType.DATE,
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['eventId', 'userId'],
      },
    ],
  },
);

export default Attending;
