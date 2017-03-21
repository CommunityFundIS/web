import db from '../db';
import User from './User';
import Submission from './Submission';
import Vote from './Vote';

function sync(...args) {
  return db.sync(...args);
}

Submission.hasMany(Vote, { as: 'Votes' });
Vote.belongsTo(Submission);
Vote.belongsTo(User);

export default { sync };
export { User, Submission, Vote };
