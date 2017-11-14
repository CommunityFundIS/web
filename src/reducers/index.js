import { combineReducers } from 'redux';
import user from './user';
import grant from './grant';
import { submission, submissionStatus } from './submission';
import castVote from './castVote';
import runtime from './runtime';
import topics from './topics';
import users from './users';

export default combineReducers({
  user,
  grant,
  submission,
  submissionStatus,
  castVote,
  runtime,
  topics,
  users,
});
