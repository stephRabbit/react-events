import { createReducer } from '../../app/common/util/reducerUtil';
import { LOGIN_USER, SIGNOUT_USER } from './authConstants';

const initState = {
  currentUser: {}
};

const loginUser = (state, payload) => {
  return {
    ...state,
    authenticated: true,
    currentUser: payload.userData.email
  };
};

const signOutUser = (state, payload) => {
  return {
    ...state,
    authenticated: false,
    currentUser: {}
  }
};

export default createReducer(
  initState,
  {
    [LOGIN_USER]: loginUser,
    [SIGNOUT_USER]: signOutUser
  }
);