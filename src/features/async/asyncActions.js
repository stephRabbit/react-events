import { ASYNC_ACTION_END, ASYNC_ACTION_ERROR, ASYNC_ACTION_START } from './asyncConstants';

export const asyncEnd = () => {
  return {
    type: ASYNC_ACTION_END
  };
};

export const asyncError = () => {
  return {
    type: ASYNC_ACTION_ERROR
  };
};

export const asyncStart = () => {
  return {
    type: ASYNC_ACTION_START
  };
};
