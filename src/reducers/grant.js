import {
  GRANT_INPUT_CHANGED,
  GRANT_FORM_VALIDATION_ERRORS,
} from '../constants';

export default function grant(state = {}, action) {
  switch (action.type) {
    case GRANT_INPUT_CHANGED: {
      const { field, value, error } = action.payload;
      const values = { ...state.values, [field]: value };
      const errors = { ...state.errors, [field]: error };

      return {
        ...state,
        values,
        errors,
      };
    }
    case GRANT_FORM_VALIDATION_ERRORS:
      return { ...state, errors: action.payload };
    default:
      return state;
  }
}
