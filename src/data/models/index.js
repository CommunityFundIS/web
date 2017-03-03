import db from '../db';
import User from './User';

function sync(...args) {
  return db.sync(...args);
}

export default { sync };
export {
  User,
};
