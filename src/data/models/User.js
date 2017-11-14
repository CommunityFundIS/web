import DataType from 'sequelize';
import bcrypt from 'bcryptjs';
import Model from '../db';

const User = Model.define(
  'user',
  {
    id: {
      type: DataType.UUID,
      defaultValue: DataType.UUIDV1,
      primaryKey: true,
    },
    email: {
      type: DataType.STRING(255),
      validate: { isEmail: true },
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataType.STRING(255),
    },
    name: {
      type: DataType.STRING(255),
    },
    isReviewer: {
      type: DataType.BOOLEAN,
      defaultValue: false,
    },
    isOperator: {
      type: DataType.BOOLEAN,
      defaultValue: false,
    },
    image: {
      type: DataType.STRING(255),
    },
    title: {
      type: DataType.STRING(255),
    },
    isPublic: {
      type: DataType.BOOLEAN,
      defaultValue: true,
    },
    verified: {
      type: DataType.BOOLEAN,
      defaultValue: false,
    },
    verificationToken: {
      type: DataType.STRING(255),
    },
    resetToken: {
      type: DataType.STRING(255),
    },
    createdAt: DataType.DATE,
    updatedAt: DataType.DATE,
  },
  {
    indexes: [{ fields: ['id', 'email'] }],
  },
);

User.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

User.prototype.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

export default User;
