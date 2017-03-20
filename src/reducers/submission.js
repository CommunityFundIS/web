import {
  GET_SUBMISSION_SUCCESS,
  GET_SUBMISSION_STATUS_SUCCESS,
} from '../constants';

export function submission(state = {}, action) {
  switch (action.type) {
    case GET_SUBMISSION_SUCCESS: {
      return {
        ...state,
        [action.payload.submission.id]: action.payload.submission,
      };
    }
    default:
      return state;
  }
}

export function submissionStatus(state = {}, action) {
  switch (action.type) {
    case GET_SUBMISSION_STATUS_SUCCESS: {
      return {
        ...state,
        [action.payload.submissionId]: action.payload.status,
      };
    }
    default:
      return state;
  }
}
