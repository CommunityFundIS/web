import { log, logError } from '../logger';

import { GET_SUBMISSION_SUCCESS } from '../constants';

export function getSubmissionSuccess(submission) {
  return {
    type: GET_SUBMISSION_SUCCESS,
    payload: submission,
  };
}

export const fetchSubmission = id => async (dispatch, getStore, { graphqlRequest }) => {
  const query = `{
      submission(id: "${id}") {
        id
        name
        email
        phone
        date
        summary
        description
        askAmount
        totalCost
      }
    }`;
  log('query is', query);

  try {
    const { data, errors } = await graphqlRequest(query);
    log('got back', data, errors);

    if (errors) {
      return null;
    }

    dispatch(getSubmissionSuccess(data.submission));
    return data.submission;
  } catch (e) {
    logError('Failed to mutate ingredient', e);
    return null;
  }
};
