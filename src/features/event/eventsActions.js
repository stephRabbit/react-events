import { CREATE_EVENT, DELETE_EVENT, UPDATE_EVENT } from './eventsConstants';

export const createEvent = event => {
  return {
    type: CREATE_EVENT,
    payload: {
      event
    }
  }
};

export const deleteEvent = id => {
  return {
    type: DELETE_EVENT,
    payload: {
      id
    }
  }
};

export const updateEvent = event => {
  return {
    type: UPDATE_EVENT,
    payload: {
      event
    }
  }
};