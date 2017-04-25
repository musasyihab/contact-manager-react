import {
  CONTACT_UPDATE,
  CONTACT_CREATE,
  CONTACT_CREATE_SUCCESS,
  CONTACT_EDIT,
  CONTACT_ERROR,
  CONTACT_LOADING,
  FORM_RESET
} from '../actions/types';

const INITIAL_STATE = {
  id: '',
  firstName: '',
  lastName: '',
  age: '',
  success: false,
  error: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONTACT_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case CONTACT_CREATE:
      return INITIAL_STATE;
    case CONTACT_CREATE_SUCCESS:
      return { ...state, success: true };
    case CONTACT_ERROR:
      return { ...state, error: action.error };
    case CONTACT_LOADING:
      return { ...state, loading: action.loading };
    case CONTACT_EDIT:
      return INITIAL_STATE;
    case FORM_RESET:
      return INITIAL_STATE;
    default:
      return state;
  }
};
