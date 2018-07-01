import { LOGIN_USER, SIGNOUT_USER } from './authConstants';

export const loginUser = (userData) => {
  return {
    type: LOGIN_USER,
    payload: {
      userData
    }
  }
};

export const signOutUser = () => {
  return {
    type: SIGNOUT_USER
  }
};