import { toastr } from 'react-redux-toastr';
// -------------------
import { CREATE_EVENT, DELETE_EVENT, FETCH_EVENTS, UPDATE_EVENT } from './eventsConstants';
import { asyncEnd, asyncError, asyncStart } from '../async/asyncActions';
import { fetchMockData } from '../../app/data/mockApi';

export const createEvent = event => {
  return async dispatch => {
    try {
      dispatch({
        type: CREATE_EVENT,
        payload: {
          event
        }
      });
      toastr.success('Success!', 'Event has been created.');
    }
    catch (err) {
      toastr.error('Oops!', 'Something went wrong.');
    }
  };
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
  return async dispatch => {
    try {
      dispatch({
        type: UPDATE_EVENT,
        payload: {
          event
        }
      });
      toastr.success('Success!', 'Event has been created.');
    }
    catch (err) {
      toastr.error('Oops!', 'Something went wrong.');
    }
  };
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