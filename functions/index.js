const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const newActivity = (type, event, id) => {
  return {
    type,
    eventDate: event.date,
    hostedBy: event.hostedBy,
    title: event.title,
    photoURL: event.hostPhotoURL,
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
    hostUid: event.hostUid,
    eventId: id
  };
}

exports.createActivity = functions.firestore
  .document('events/{eventId}')
  .onCreate(event => {
    let newEvent = event.data.data();
    console.log(newEvent);
    const activity = newActivity('newEvent', newEvent, event.data.id);
    console.log(activity)

    return admin.firestore().collection('activity')
      .add(activity)
      .then(docRef => console.log('Activity created with ID: ', docRef.id))
      .catch(err => console.log('Error adding activity', err))
  })

exports.cancelActivity = functions.firestore
  .document('events/{eventId}')
  .onUpdate((event, context) => {
    let updatedEvent = event.data.after.data();
    let previousEventData = event.data.brfore.data();
    console.log({ event })
    console.log({ context })
    console.log({ updatedEvent })
    console.log({ previousEventData })

    if (!updatedEvent.cancelled || updatedEvent.cancelled === previousEventData.cancelled) {
      return false;
    }

    const activity = newActivity('cancellledEvent', updatedEvent, context.params.eventId);
    console.log(activity);

    return admin.firestore().collection('activity')
      .add(activity)
      .then(docRef => console.log('Activity created with ID: ', docRef.id))
      .catch(err => console.log('Error adding activity', err))
  });