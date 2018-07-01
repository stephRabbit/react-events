import {
  COUNTER_FINISHED,
  COUNTER_STARTED,
  DECREMENT_COUNT,
  INCREMENT_COUNT
} from './testContant';

export const startCounter = () => {
  return {
    type: COUNTER_FINISHED
  };
};

export const finishedCounter = () => {
  return {
    type: COUNTER_STARTED
  };
};

export const decrementCount = () => {
  return {
    type: DECREMENT_COUNT
  };
};

export const incrementCount = () => {
  return {
    type: INCREMENT_COUNT
  };
};

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export const decrementAsync = () => {
  return async dispatch => {
    dispatch(startCounter());
    await delay(1000);
    dispatch(decrementCount()); // or dispatch({ type: DECREMENT_COUNT })
    dispatch(finishedCounter());
  }
}

export const incrementAsync = () => {
  return async dispatch => {
    dispatch(startCounter());
    await delay(1000);
    dispatch({ type: INCREMENT_COUNT }); // or dispatch(incrementCount())
    dispatch(finishedCounter());
  }
}
