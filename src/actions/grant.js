/* eslint-disable import/prefer-default-export */

import validator from 'validator';
import {
  GRANT_INPUT_CHANGED,
  GRANT_FORM_VALIDATION_ERRORS,
  GRANT_FORM_SUBMIT_SUCCESS
} from '../constants';
import { log, logError } from '../logger';
import { isDev } from '../config';
import history from '../core/history';

const validateInput = (store, field, value, onSubmit) => {
  if (isDev && field === 'googleToken') {
    return null;
  }
  if (!value || value === '') {
    return 'Required';
  }

  if (field === 'date') {
    if (value.unix() < Date.now() / 1000) {
      return 'Past date';
    }
  }

  if (field === 'askAmount' || field === 'totalCost') {
    if (!(validator.isInt(value) || validator.isFloat(value))) {
      return 'Must be a valid number';
    }
  }

  if (onSubmit && field === 'email') {
    if (!validator.isEmail(value)) {
      return 'Invalid email';
    }
  }

  if (
    field === 'askAmount' &&
    store.grant.values &&
    parseInt(store.grant.values.totalCost, 10) < parseInt(value, 10)
  ) {
    return 'The ask amount must lower than the total cost';
  }

  if (
    field === 'totalCost' &&
    store.grant.values &&
    parseInt(store.grant.values.totalCost, 10) > parseInt(value, 10)
  ) {
    return 'The total cost must be higher than the ask amount';
  }

  return null;
};

export function inputChange(field, value) {
  return async (dispatch, getStore) => {
    const store = getStore();

    const error = validateInput(store, field, value, false);

    dispatch({
      type: GRANT_INPUT_CHANGED,
      payload: {
        field,
        value,
        error
      }
    });
  };
}

export function showValidationErrors(errors) {
  return {
    type: GRANT_FORM_VALIDATION_ERRORS,
    payload: errors
  };
}

export function submitGrantSuccess(submissionId) {
  return {
    type: GRANT_FORM_SUBMIT_SUCCESS,
    payload: {
      submissionId
    }
  };
}

export function submitGrant() {
  return async (dispatch, getStore, { graphqlRequest }) => {
    const store = getStore();

    const values = store.grant.values || {};
    const {
      name,
      phone,
      email,
      date,
      summary,
      description,
      askAmount,
      totalCost,
      googleToken
    } = values;

    // @TODO do better validation
    const validationErrors = {};
    [
      'name',
      'phone',
      'email',
      'date',
      'summary',
      'description',
      'askAmount',
      'totalCost',
      'googleToken'
    ].forEach(field => {
      const error = validateInput(store, field, values[field], true);
      if (error) {
        validationErrors[field] = error;
      }
    });

    if (Object.keys(validationErrors).length > 0) {
      return dispatch(showValidationErrors(validationErrors));
    }

    // @TODO we should use some graphql plugin to make the queries
    const query = `
      mutation M($description: String! $summary: String!){
        createSubmission(
          name:"${name}",
          phone:"${phone}",
          email:"${email}",
          date:"${date.format('DD/MM/YYYY')}",
          summary: $summary,
          description: $description,
          askAmount:"${askAmount}",
          totalCost:"${totalCost}",
          googleToken:"${!isDev ? googleToken : ''}",
        ) {
          id
        }
      }
    `;

    try {
      const { data, errors } = await graphqlRequest(query, {
        description,
        summary
      });
      log('got back', data, errors);

      if (errors) {
        const errorMessages = errors.map(error => error.message);
        return dispatch(showValidationErrors({ form: errorMessages }));
      }

      const submissionId = data.createSubmission.id;
      log('success!');
      await dispatch(submitGrantSuccess(submissionId));
      history.push('/grant/success');
      return true;
    } catch (e) {
      logError('Failed to mutate ingredient', e);
      return dispatch(
        showValidationErrors({ form: ['Unknown server error. Sorry!'] })
      );
    }
  };
}
