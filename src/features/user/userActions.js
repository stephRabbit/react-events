import moment from 'moment';
import { toastr } from 'react-redux-toastr';
import cuid from 'cuid';
// -------------------
import { asyncEnd, asyncError, asyncStart } from '../async/asyncActions';

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