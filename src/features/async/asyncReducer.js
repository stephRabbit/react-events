import { createReducer } from '../../app/common/util/reducerUtil';
import { ASYNC_ACTION_END, ASYNC_ACTION_ERROR, ASYNC_ACTION_START } from './asyncConstants';

const initState = {
  loading: false
};

const asyncEnd = (state, payload) => {
  return { ...state, loading: false };
};

const asyncError = (state, payload) => {
  return { ...state, loading: false };
};

const asyncStart = (state, payload) => {
  return { ...state, loading: true };
};

export default createReducer(
  initState,
  {
    [ASYNC_ACTION_END]: asyncEnd,
    [ASYNC_ACTION_ERROR]: asyncError,
    [ASYNC_ACTION_START]: asyncStart
  }
);