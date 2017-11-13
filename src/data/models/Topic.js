import DataType from 'sequelize';
import Model from '../db';

const Topic = Model.define('topic', {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true,
  },
  name: {
    type: DataType.STRING(255),
  },
  color: {
    type: DataType.STRING(255),
  },
  createdAt: DataType.DATE,
  updatedAt: DataType.DATE,
});

export default Topic;
