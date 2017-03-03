import Sequelize from 'sequelize';
import { db } from '../config.js';

const sequelize = new Sequelize(db.database, db.user, db.password, {
  host: db.host,
  dialect: 'postgres',
  define: {
    freezeTableName: true,
  },
});

export default sequelize;
