import { createReducer } from '../../app/common/util/reducerUtil';
import {
  COUNTER_FINISHED,
  COUNTER_STARTED,
  DECREMENT_COUNT,
  INCREMENT_COUNT
} from '../../features/testarea/testContant';

const initState = {
  data: 99,
  loading: false
};

export const decrementCounter = (state, payload) => {
  return { ...state, data: state.data - 1 };
};

export const incrementCounter = (state, payload) => {
  return { ...state, data: state.data + 1 };
};

const counterFinished = (state, payload) => {
  return { ...state, loading: true };
};

const counterStarted = (state, payload) => {
  return { ...state, loading: false };
};

// export default (state = initState, action) => {
//   switch (action.type) {
//     case DECREMENT_COUNT:
//       return {...state, data: state.data + 1};
//     case  INCREMENT_COUNT:
//       return {...state, data: state.data - 1};
//     default:
//     return state;
//   }
// };

export default createReducer(
  initState,
  {
    [COUNTER_FINISHED]: counterFinished,
    [COUNTER_STARTED]: counterStarted,
    [DECREMENT_COUNT]: decrementCounter,
    [INCREMENT_COUNT]: incrementCounter,
  }
);