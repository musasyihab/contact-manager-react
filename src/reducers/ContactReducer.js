import {
  LOAD_CONTACTS_SUCCESS,
  LOAD_CONTACTS_FAIL
} from '../actions/types';

const INITIAL_STATE = {
  contacts: [],
  error: '',
  loading: true
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    /*case LOAD_CONTACTS:
      return { ...state, loading: true, error: '' };*/
    case LOAD_CONTACTS_SUCCESS:
      return { ...state, loading: false, error: '', contacts: action.payload };
    case LOAD_CONTACTS_FAIL:
      return { ...state, error: 'Load Contact Failed.', loading: false };
    default:
      return state;
  }
};
