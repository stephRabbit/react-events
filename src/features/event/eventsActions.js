import { toastr } from 'react-redux-toastr';
import moment from 'moment';
// -------------------
import firebase from '../../app/config/firebase';
import { DELETE_EVENT, FETCH_EVENTS } from './eventsConstants';
import { createNewEvent } from '../../app/common/util/helpers';
import { asyncEnd, asyncError, asyncStart } from '../async/asyncActions';
import { fetchMockData } from '../../app/data/mockApi';

export const createEvent = event => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const user = firestore.auth().currentUser;
    // getState.reducer.property
    const photoURL = getState().firebase.profile.photoURL;
    let newEvent = createNewEvent(user, photoURL, event);
    try {
      let createdEvent = await firestore.add(`events`, newEvent);
      await firestore.set(`event_attendee/${createdEvent.id}_${user.uid}`, {
        eventId: createdEvent.id,
        userUid: user.uid,
        eventDate: event.date,
        host: true
      });
      toastr.success('Success!', 'Event has been created.');
    }
    catch (err) {
      console.log(err)
      toastr.error('Oops!', 'Something went wrong.');
    }
  };
};

export const cancelToggle = (cancelled, eventId) => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const message = cancelled
      ? 'Are you sure? This will cancel your event!'
      : 'Are you sure? This will reactivate event!'
    try {
      toastr.confirm(message, {
        onOk: () => firestore.update(`events/${eventId}`, {
          cancelled: cancelled
        })
      });
    }
    catch (error) {

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

export const getEventsForDashboard = (lastEvent) =>
  async (dispatch, getState) => {
    let today = new Date(Date.now());
    const firestore = firebase.firestore();
    const eventsRef = firestore.collection('events');

    try {
      dispatch(asyncStart());
      let startAfter =
        lastEvent && (await firestore
          .collection('events')
          .doc(lastEvent.id)
          .get());
      let query;

      lastEvent
        ? (query = eventsRef
          .where('date', '>=', today)
          .orderBy('date')
          .startAfter(startAfter)
          .limit(2))
        : (query = eventsRef
          .where('date', '>=', today)
          .orderBy('date')
          .limit(2));

      let events = [];
      let querySnap = await query.get();

      if (querySnap.docs.length === 0) {
        dispatch(asyncEnd());
        return querySnap;
      }

      for (let i = 0; i < querySnap.docs.length; i++) {
        let evt = {
          id: querySnap.docs[i].id,
          ...querySnap.docs[i].data()
        }
        events.push(evt);
      }

      dispatch({
        type: FETCH_EVENTS,
        payload: { events }
      });
      dispatch(asyncEnd());

      return querySnap;
    }
    catch (err) {
      console.log(err);
      dispatch(asyncError());
    }
  };

export const updateEvent = event => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    if (event.date !== getState().firestore.ordered.events[0].date) {
      event.date = moment(event.date).toDate();
    }
    try {
      await firestore.update(`events/${event.id}`, event);
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