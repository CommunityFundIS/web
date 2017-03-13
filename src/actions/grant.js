/* eslint-disable import/prefer-default-export */
import { GRANT_INPUT_CHANGED } from '../constants';
import { log, logError } from '../logger';
import { isDev } from '../config';

export function inputChange(field, value) {
  return {
    type: GRANT_INPUT_CHANGED,
    payload: {
      [field]: value,
    },
  };
}

export function submitGrant() {
  return async (dispatch, getStore, { graphqlRequest }) => {
    const {
      grant,
      grant: {
        name,
        phone,
        email,
        date,
        summary,
        description,
        askAmount,
        totalCost,
        googleToken,
      },
    } = getStore();

    // @TODO do better validation
    let validationError = null;
    ['name', 'phone', 'email', 'date', 'summary', 'description', 'askAmount', 'totalCost', 'googleToken'].forEach(field => {
      // Skip googleToken in dev mode
      if (isDev && field === 'googleToken') return;
      const value = grant[field];
      if (!value || value === '') {
        validationError = `${field} has wrong value`;
      }
    });

    // @TODO handle error
    if (validationError) return logError(validationError);

    // @TODO handle error
    if (date.unix() < (Date.now() / 1000)) return logError('Past date');

    const query = `
      mutation{
        createSubmission(
          name:"${name}",
          phone:"${phone}",
          email:"${email}",
          date:"${date.format('DD/MM/YYYY')}",
          summary:"${summary}",
          description:"${description}",
          askAmount:"${askAmount}",
          totalCost:"${totalCost}",
          googleToken:"${!isDev ? googleToken : ''}",
        ) {
          id
        }
      }
    `;
    log('query is', query);

    try {
      const { data, error } = await graphqlRequest(query);
      log('got back', data, error);
    } catch (e) {
      logError('Failed to mutate ingredient', e);
      // @TODO dispatch failure event
      return false;
    }

    // @TODO dispatch success event
    log('success!');
    return true;
  };
}
