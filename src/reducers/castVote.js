import { VOTE_ADD_COMMENT, VOTE_CAST_VOTE_ERROR } from '../constants';

export default function castVote(state = {}, action) {
  switch (action.type) {
    case VOTE_ADD_COMMENT: {
      const { submissionId, comment } = action.payload;
      const form = state[submissionId];
      return {
        ...state,
        [action.payload.submissionId]: { ...form, comment },
      };
    }

    case VOTE_CAST_VOTE_ERROR: {
      const { submissionId, error } = action.payload;
      const form = state[submissionId];
      return {
        ...state,
        [action.payload.submissionId]: { ...form, error },
      };
    }
    default:
      return state;
  }
}
