import { combineReducers } from 'redux';

// Reducers
import testReducer from '../../features/testarea/testReducer';
import eventsReducer from '../../features/event/eventReducers';

const rootReducer = combineReducers({
  test: testReducer,
  events: eventsReducer
});

export default rootReducer;