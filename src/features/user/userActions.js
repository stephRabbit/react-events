import moment from 'moment';
import { toastr } from 'react-redux-toastr';

export const updateProfile  = user => async (dispatch, getState, { getFirebase }) => {
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