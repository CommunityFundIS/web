import DataType from 'sequelize';
import bcrypt from 'bcryptjs';
import Model from '../db';

const User = Model.define('user', {
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
}, {
  classMethods: {
    generateHash(password) {
      return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    },
  },
  instanceMethods: {
    comparePassword(password) {
      return bcrypt.compareSync(password, this.password);
    },
  },
  indexes: [
    { fields: ['id', 'email'] },
  ],
});

export default User;
