/* eslint-disable import/prefer-default-export */

import { GRANT_INPUT_CHANGED } from '../constants';
import { log } from '../logger';

export function inputChange(field, value) {
  return {
    type: GRANT_INPUT_CHANGED,
    payload: {
      [field]: value,
    },
  };
}

export function submitGrant() {
  log('submit the grant');
}
