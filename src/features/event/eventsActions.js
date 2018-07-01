import { CREATE_EVENT, DELETE_EVENT, FETCH_EVENTS, UPDATE_EVENT } from './eventsConstants';
import { asyncEnd, asyncError, asyncStart } from '../async/asyncActions';
import { fetchMockData } from '../../app/data/mockApi';

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

export const fetchEvents = events => {
  return {
    type: FETCH_EVENTS,
    payload: events
  };
};

export const updateEvent = event => {
  return {
    type: UPDATE_EVENT,
    payload: {
      event
    }
  }
};

export const loadEvents = () => {
  return async dispatch => {
    try {
      dispatch(asyncStart());
      const events = await fetchMockData();
      dispatch(fetchEvents(events));
      dispatch(asyncEnd());
    }
    catch (error) {
      console.log('ERROR: ', error);
      dispatch(asyncError());
    }
  };
};