import { VOTE_ADD_COMMENT, VOTE_CAST_VOTE_ERROR } from '../constants';
import { log, logError } from '../logger';
import { getSubmissionStatusSuccess } from './submission';

export function addComment(submissionId, comment) {
  return {
    type: VOTE_ADD_COMMENT,
    payload: {
      submissionId,
      comment
    }
  };
}

function castVoteError(submissionId, error) {
  return {
    type: VOTE_CAST_VOTE_ERROR,
    payload: {
      submissionId,
      error
    }
  };
}

function castVote(submissionId, result) {
  return async (dispatch, getStore, { graphqlRequest }) => {
    const store = getStore();
    const vote = store.castVote;

    const comment = vote[submissionId] && vote[submissionId].comment;

    const commentParameter = comment ? `comment: "${comment}",` : '';

    const query = `
      mutation{
        castVote(
          submissionId: "${submissionId}",
          ${commentParameter}
          result: "${result}"
        ) {
          result
          votes {
            id
            comment
            result
            userId
          }
        }
      }
    `;

    try {
      const { data, errors } = await graphqlRequest(query);
      log('got back', data, errors);

      if (errors) {
        const errorMessages = errors.map(error => error.message);
        return dispatch(castVoteError(submissionId, errorMessages.join(',')));
      }

      return dispatch(getSubmissionStatusSuccess(submissionId, data.castVote));
    } catch (e) {
      logError('Failed to mutate ingredient', e);
      return dispatch(castVoteError(submissionId, 'Error when casting vote'));
    }
  };
}

export function acceptSubmission(submissionId) {
  return castVote(submissionId, 'accepted');
}

export function rejectSubmission(submissionId) {
  return castVote(submissionId, 'rejected');
}
