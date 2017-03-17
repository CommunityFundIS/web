import { combineReducers } from 'redux';
import user from './user';
import grant from './grant';
import submission from './submission';

export default combineReducers({
  user,
  grant,
  submission,
});
