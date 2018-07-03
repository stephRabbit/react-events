import { SubmissionError, reset } from 'redux-form';
import { toastr } from 'react-redux-toastr';
// ----------------
import { closeModal } from '../modals/modalActions';

export const loginUser = user => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    try {
      await firebase.auth().signInWithEmailAndPassword(user.email, user.password);
      dispatch(closeModal());
    }
    catch (err) {
      throw new SubmissionError({
        //_error: err.message
        _error: 'Login failed... Double check username or password'
      });
    }
  }
};

export const registerUser = user => async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    try {
      // Create user
      let createdUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password);

      // Update user auth profile
      await createdUser.updateProfile({
        displayName: user.displayName
      });

      // Create new profile in firestore
      let newUser = {
        displayName: user.displayName,
        createAt: firestore.FieldValue.serverTimestamp()
      }
      await firestore.set(`users/${createdUser.uid}`, { ...newUser });
      dispatch(closeModal());
    }
    catch (err) {
      throw new SubmissionError({
        _error: err.message
      });
    }
  };

  export const socialLogin = provider => async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    try {
      dispatch(closeModal());
      let user = await firebase.login({
        provider,
        type: 'popup'
      });
      if (user.additionalUserInfo.isNewUser) {
        await firestore.set(`users/${user.user.uid}`, {
          displayName: user.profile.displayName,
          photoURL: user.profile.avatarUrl,
          createdAt: firestore.FieldValue.serverTimestamp()
        });
      }
    }
    catch (err) {
      console.log(err.message);;
    }
  };

  export const updatePassword = password => async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const user = firebase.auth().currentUser;

    try {
      await user.updatePassword(password.newPassword1);
      await dispatch(reset('account'));
      toastr.success('Success!', 'Your password has been updated');
    }
    catch (err) {
      console.log(err);
      throw new SubmissionError({
        _error: err.message
      });
    }
  };