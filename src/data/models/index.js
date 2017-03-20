import db from '../db';
import User from './User';
import Submission from './Submission';
import Vote from './Vote';

function sync(...args) {
  return db.sync(...args);
}

export default { sync };
export { User, Submission, Vote };
