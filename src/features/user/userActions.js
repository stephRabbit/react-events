import moment from 'moment';
import { toastr } from 'react-redux-toastr';
import cuid from 'cuid';
// -------------------
import firebase from '../../app/config/firebase';
import { asyncEnd, asyncError, asyncStart } from '../async/asyncActions';
import { FETCH_EVENTS } from '../event/eventsConstants';

export const cancelGoingToEvent = event =>
  async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const user = firestore.auth().currentUser;
    try {
      await firestore.update(`events/${event.id}`, {
        [`attendees.${user.uid}`]: firestore.FieldValue.delete()
      });
      await firestore.delete(`event_attendee/${event.id}_${user.uid}`);
      toastr.success('Success', 'You have removed yourself from this event!');
    }
    catch (err) {
      console.log(err);
      toastr.error('Oops', 'Problem removing yourself from this event!');
    }
  };

export const deletePhoto = photo =>
  async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const user = firebase.auth().currentUser;
    try {
      await firebase.deleteFile(`${user.uid}/user_images/${photo.name}`);
      await firestore.delete({
        collection: 'users',
        doc: user.uid,
        subcollections: [{ collection: 'photos', doc: photo.id }]
      })
    }
    catch (err) {
      console.log(err);
      throw new Error('Problem deleting photo');
    }
  };

export const goingToEvent = event =>
  async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const user = firestore.auth().currentUser;
    const photoURL = getState().firebase.profile.photoURL;
    const attendee = {
      displayName: user.displayName,
      going: true,
      host: false,
      joinDate: Date.now(),
      photoURL: photoURL || '/assets/user.png'
    };

    try {
      await firestore.update(`events/${event.id}`, {
        [`attendees.${user.uid}`]: attendee
      });
      await firestore.set(`event_attendee/${event.id}_${user.uid}`, {
        eventDate: event.date,
        eventId: event.id,
        host: false,
        userUid: user.uid
      });
      toastr.success('Success', 'You have signed up to the event');
    }
    catch (err) {
      console.log(err);
      toastr.error('Oops', 'Problem signing up to event');
    }
  };

export const setMainPhoto = photo =>
  async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    try {
      return await firebase.updateProfile({
        photoURL: photo.url
      });
    }
    catch (err) {
      console.log(err);
      throw new Error('Problem setting main photo');
    }
  };

export const updateProfile = user => async (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();
  // Omit isLoaded and isEmpty and use the rest of the user properties
  const { isLoaded, isEmpty, ...updatedUser } = user;
  if (updatedUser.dateOfBirth !== getState().firebase.profile.dateOfBirth) {
    updatedUser.dateOfBirth = moment(updatedUser.dateOfBirth).toDate();
  }

  try {
    await firebase.updateProfile(updatedUser);
    toastr.success('Success!', 'Profile updated');
  }
  catch (err) {
    console.log(err);
  }
};

export const uploadProfileImage = (file, fileName) =>
  async (dispatch, getState, { getFirebase, getFirestore }) => {
    const imageName = cuid();
    const firebase = getFirebase();
    const firestore = getFirestore();
    // Synchronous don't need await
    const user = firebase.auth().currentUser;
    const path = `${user.uid}/user_images`;
    const options = { name: imageName };

    try {
      dispatch(asyncStart());

      // Upload file to firebase storage
      let uploadedFile = await firebase.uploadFile(path, file, null, options);

      // Get url for image
      let downloadUrl = await uploadedFile.uploadTaskSnapshot.downloadURL;

      // Get userDoc from firestore
      let userDoc = await firestore.get(`users/${user.uid}`);

      // Check if user has a photo, if not update profile photo
      if (!userDoc.data().photoURL) {
        // Update firesbase document
        await firebase.updateProfile({
          photoURL: downloadUrl
        });
        // Update Profile inside firebase auth
        await user.updateProfile({
          photoURL: downloadUrl
        });
      }

      // Add photo to photos collection
      await firestore.add({
        collection: 'users',
        doc: user.uid,
        subcollections: [{ collection: 'photos' }]
      }, {
          name: imageName,
          url: downloadUrl
        });
      dispatch(asyncEnd());
    }
    catch (err) {
      console.log(err);
      dispatch(asyncError());
      throw new Error('Problem uploading photo');
    }
  };

export const getUserEvents = (userUid, activeTab) =>
  async (dispatch, getState) => {
    dispatch(asyncStart());
    const today = new Date(Date.now());
    const firestore = firebase.firestore();
    let eventsRef = firestore.collection('event_attendee');
    let query;

    switch (activeTab) {
      // Past events
      case 1:
        query = eventsRef
          .where('userUid', '==', userUid)
          .where('eventDate', '<=', today)
          .orderBy('eventDate', 'desc');
        break;
      case 2:
        // Past events
        query = eventsRef
          .where('userUid', '==', userUid)
          .where('eventDate', '>=', today)
          .orderBy('eventDate');
        break;
      case 3:
        // Hosted events
        query = eventsRef
          .where('userUid', '==', userUid)
          .where('host', '==', true)
          .orderBy('eventDate', 'desc');
        break;
      default:
        query = eventsRef
          .where('userUid', '==', userUid)
          .orderBy('eventDate', 'desc');
    }

    try {
      let querySnap = await query.get();
      let events = [];
      for (let i = 0; i < querySnap.docs.length; i++) {
        let evt = await firestore.collection('events').doc(querySnap.docs[i].data().eventId).get();
        events.push({ id: evt.id, ...evt.data() });
      }
      dispatch({
        type: FETCH_EVENTS,
        payload: { events }
      })
      dispatch(asyncEnd());
    }
    catch (err) {
      console.log(err);
      dispatch(asyncError());
    }
  }