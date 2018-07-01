import { combineReducers } from 'redux';

// Reducers
import { reducer as FormReducer } from 'redux-form';
import asyncReducer from '../../features/async/asyncReducer';
import authReducer from '../../features/auth/authReducer';
import testReducer from '../../features/testarea/testReducer';
import eventsReducer from '../../features/event/eventReducers';
import modalReducer from '../../features/modals/modalReducer';

const rootReducer = combineReducers({
  async: asyncReducer,
  auth: authReducer,
  events: eventsReducer,
  form: FormReducer,
  modals: modalReducer,
  test: testReducer
});

export default rootReducer;