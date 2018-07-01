import { combineReducers } from 'redux';

// Reducers
import { reducer as formReducer } from 'redux-form';
import { reducer as toastrReducer } from 'react-redux-toastr';
import asyncReducer from '../../features/async/asyncReducer';
import authReducer from '../../features/auth/authReducer';
import testReducer from '../../features/testarea/testReducer';
import eventsReducer from '../../features/event/eventReducers';
import modalReducer from '../../features/modals/modalReducer';

const rootReducer = combineReducers({
  async: asyncReducer,
  auth: authReducer,
  events: eventsReducer,
  form: formReducer,
  modals: modalReducer,
  test: testReducer,
  toastr: toastrReducer
});

export default rootReducer;