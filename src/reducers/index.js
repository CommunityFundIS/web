import { combineReducers } from 'redux';
import user from './user';
import grant from './grant';

export default combineReducers({
  user,
  grant,
});
