/* eslint-disable import/prefer-default-export */
import { logError } from '../logger';
import updateUserAST from '../data/mutations/updateUser.gql';

const updateUserMutation = updateUserAST.loc.source.body;

export const updateUser = variables => async (
  dispatch,
  getStore,
  { graphqlRequest },
) => {
  try {
    const { errors } = await graphqlRequest(updateUserMutation, variables);

    if (errors) {
      logError(errors);
      // return dispatch();
    }

    // return dispatch();
  } catch (e) {
    logError('Failed to mutate updateUser', e);
    // return dispatch();
  }
};
