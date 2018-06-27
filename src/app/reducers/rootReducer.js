import { combineReducers } from 'redux';

// Reducers
import { reducer as FormReducer } from 'redux-form';
import testReducer from '../../features/testarea/testReducer';
import eventsReducer from '../../features/event/eventReducers';

const rootReducer = combineReducers({
  events: eventsReducer,
  form: FormReducer,
  test: testReducer
});

export default rootReducer;