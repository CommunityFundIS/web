import db from '../db';
import User from './User';
import Submission from './Submission';
import Vote from './Vote';
import Topic from './Topic';
import UserTopic from './UserTopic';
import Group from './Group';
import Event from './Event';
import Attending from './Attending';

function sync(...args) {
  return db.sync(...args);
}

Submission.hasMany(Vote, { as: 'Votes' }); // Submission.getVotes()
Vote.belongsTo(Submission); // Vote.getSubmission()
Vote.belongsTo(User); // Vote.getUser()

Group.hasMany(Event); // Group.getEvents()
Event.belongsTo(Group); // Event.getGroup()

User.belongsToMany(Topic, { through: UserTopic, as: 'Topics' }); // User.getTopics()
Topic.belongsToMany(User, { through: UserTopic, as: 'User' }); // Topic.getUser()

Attending.belongsTo(Event);
Event.hasMany(Attending, { as: 'Attending' }); // Event.getAttending()
Attending.belongsTo(User);
User.hasMany(Attending, { as: 'Attending' }); // User.getAttending()

export default { sync };
export { User, Submission, Vote, Topic, UserTopic, Group, Event, Attending };
