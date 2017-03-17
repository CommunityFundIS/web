import { GET_SUBMISSION_SUCCESS } from '../constants';

export default function grant(state = {}, action) {
  switch (action.type) {
    case GET_SUBMISSION_SUCCESS: {
      return {
        ...state,
        [action.payload.id]: action.payload,
      };
    }
    default:
      return state;
  }
}
