import db from '../db';
import User from './User';
import Submission from './Submission';

function sync(...args) {
  return db.sync(...args);
}

export default { sync };
export {
  User,
  Submission,
};
