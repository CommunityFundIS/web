import { GRANT_INPUT_CHANGED } from '../constants';

export default function grant(state = {}, action) {
  switch (action.type) {
    case GRANT_INPUT_CHANGED:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
