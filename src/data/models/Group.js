import DataType from 'sequelize';
import Model from '../db';

const Group = Model.define(
  'group',
  {
    id: {
      type: DataType.UUID,
      defaultValue: DataType.UUIDV1,
      primaryKey: true,
    },
    name: {
      type: DataType.STRING(255),
      allowNull: false,
    },
    slug: {
      type: DataType.STRING(255),
      unique: true,
      allowNull: false,
    },
    logo: {
      type: DataType.STRING(255),
    },
    description: {
      type: DataType.TEXT,
    },
    color: {
      type: DataType.STRING(30),
    },
    gradient: {
      type: DataType.STRING(100),
    },
    createdAt: DataType.DATE,
    updatedAt: DataType.DATE,
  },
  {
    indexes: [{ fields: ['id', 'slug'] }],
  },
);

Group.generateSlug = function(name) {
  return name.replace(/[^\w\d_]+/g, '-');
};

export default Group;
