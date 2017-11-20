import DataType from 'sequelize';
import Model from '../db';

const Event = Model.define(
  'event',
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
    briefing: {
      type: DataType.TEXT,
    },
    description: {
      type: DataType.TEXT,
    },
    color: {
      type: DataType.STRING(30),
    },
    location: {
      type: DataType.STRING(255),
    },
    geolocation: {
      type: DataType.GEOMETRY('POINT'),
    },
    startTime: DataType.DATE,
    endTime: DataType.DATE,
    groupId: {
      type: DataType.UUID,
    },
    createdAt: DataType.DATE,
    updatedAt: DataType.DATE,
  },
  {
    indexes: [{ fields: ['id', 'slug'] }],
  },
);

Event.generateSlug = function(name) {
  return name.replace(/[^\w\d_]+/g, '-');
};

export default Event;
