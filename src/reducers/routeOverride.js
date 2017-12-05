import { SET_ROUTE_OVERRIDE } from '../constants';

export default function routeOverride(state = null, action) {
  switch (action.type) {
    case SET_ROUTE_OVERRIDE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
