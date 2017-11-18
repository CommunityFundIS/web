import db from '../db';
import User from './User';
import Submission from './Submission';
import Vote from './Vote';
import Topic from './Topic';
import UserTopic from './UserTopic';
import Group from './Group';

function sync(...args) {
  return db.sync(...args);
}

Submission.hasMany(Vote, { as: 'Votes' });
Vote.belongsTo(Submission);
Vote.belongsTo(User);

User.belongsToMany(Topic, { through: UserTopic, as: 'Topics' }); // User.getTopics()
Topic.belongsToMany(User, { through: UserTopic, as: 'User' }); // Topic.getUser()

export default { sync };
export { User, Submission, Vote, Topic, UserTopic, Group };
