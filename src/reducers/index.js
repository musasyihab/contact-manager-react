import { combineReducers } from 'redux';
import ContactReducer from './ContactReducer';
import ContactFormReducer from './ContactFormReducer';

export default combineReducers({
  contactReducer: ContactReducer,
  contactForm: ContactFormReducer
});
