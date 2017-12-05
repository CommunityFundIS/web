/* eslint-disable import/prefer-default-export */

import { SET_ROUTE_OVERRIDE } from '../constants';

export function setRouteOverride({ prepend }) {
  return {
    type: SET_ROUTE_OVERRIDE,
    payload: {
      prepend,
    },
  };
}
