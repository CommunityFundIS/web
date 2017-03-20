import { VOTE_ADD_COMMENT, VOTE_CAST_VOTE_ERROR } from '../constants';
import { log, logError } from '../logger';

export function addComment(submissionId, comment) {
  return {
    type: VOTE_ADD_COMMENT,
    payload: {
      submissionId,
      comment,
    },
  };
}

function castVoteError(submissionId, error) {
  return {
    type: VOTE_CAST_VOTE_ERROR,
    payload: {
      submissionId,
      error,
    },
  };
}

export function castVote(submissionId, result) {
  return async (dispatch, getStore, { graphqlRequest }) => {
    const {
      castVote,
    } = getStore();

    const comment = castVote[submissionId] && castVote[submissionId].comment;

    const commentParameter = comment ? `comment: "${comment}",` : '';

    const query = `
      mutation{
        castVote(
          submissionId: "${submissionId}",
          ${commentParameter}
          result: "${result}"
        ) {
          id
        }
      }
    `;
    log('query is', query);

    try {
      const { data, errors } = await graphqlRequest(query);
      log('got back', data, errors);

      if (errors) {
        const errorMessages = errors.map(error => error.message);
        return dispatch(castVoteError(submissionId, errorMessages.join(',')));
      }

      return true;
    } catch (e) {
      logError('Failed to mutate ingredient', e);
      return dispatch(castVoteError(submissionId, 'Error when casting vote'));
    }
  };
}
