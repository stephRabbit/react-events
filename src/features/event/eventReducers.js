import { createReducer } from '../../app/common/util/reducerUtil';
import { CREATE_EVENT, DELETE_EVENT, FETCH_EVENTS, UPDATE_EVENT } from './eventsConstants';

const initState = [];

const createEvent = (state, payload) => {
  return [
    ...state,
    //Object.assign({}, payload.event)
    { ...payload.event }
  ];
};

const deleteEvent = (state, payload) => {
  return [...state.filter(event => event.id !== payload.id)];
};

const updateEvent = (state, payload) => {
  return [
    ...state.filter(event => event.id !== payload.event.id),
    //Object.assign({}, payload.event)
    { ...payload.event }
  ];
};

const fetchEvents = (state, payload) => {
  return payload.events;
};

export default createReducer(
  initState,
  {
    [CREATE_EVENT]: createEvent,
    [DELETE_EVENT]: deleteEvent,
    [FETCH_EVENTS]: fetchEvents,
    [UPDATE_EVENT]: updateEvent
  }
);