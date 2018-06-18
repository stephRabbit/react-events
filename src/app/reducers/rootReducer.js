import { combineReducers } from 'redux';

// Reducers
import testReducer from '../../features/testarea/testReducer';

const rootReducer = combineReducers({
  test: testReducer
});

export default rootReducer;