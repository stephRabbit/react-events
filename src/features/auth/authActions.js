import { LOGIN_USER, SIGNOUT_USER } from './authConstants';
import { closeModal } from '../modals/modalActions';

export const loginUser = (userData) => {
  return dispatch => {
    dispatch({ type: LOGIN_USER, payload: { userData }})
    dispatch(closeModal());
  }
};

export const signOutUser = () => {
  return {
    type: SIGNOUT_USER
  }
};