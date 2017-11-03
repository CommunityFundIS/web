import { log, logError } from '../logger';

import {
  GET_SUBMISSION_SUCCESS,
  GET_SUBMISSION_STATUS_SUCCESS,
} from '../constants';

export function getSubmissionSuccess(submission) {
  return {
    type: GET_SUBMISSION_SUCCESS,
    payload: {
      submission,
    },
  };
}

export function getSubmissionStatusSuccess(submissionId, status) {
  return {
    type: GET_SUBMISSION_STATUS_SUCCESS,
    payload: {
      submissionId,
      status,
    },
  };
}

export const fetchSubmission = id => async (
  dispatch,
  getStore,
  { graphqlRequest },
) => {
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
      },
      status: submissionStatus(submissionId: "${id}") {
        result
        votes {
          id
          comment
          result
          userId
        }
      }
    }`;

  try {
    const { data, errors } = await graphqlRequest(query);
    log('got back', data, errors);

    if (errors) {
      // @TODO handle better
      logError(errors);
    } else if (data.submission && data.status) {
      await dispatch(getSubmissionSuccess(data.submission));
      await dispatch(getSubmissionStatusSuccess(id, data.status));
    }
  } catch (e) {
    logError('Failed to fetch submission', e);
  }
};
