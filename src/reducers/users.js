import { USERS_UPDATE_DATA } from '../constants';

export default function topics(state = { data: [] }, action) {
  switch (action.type) {
    case USERS_UPDATE_DATA:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
