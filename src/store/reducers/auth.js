import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/helpers';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  userData: {}
}

const authUserStart = (state, action) => {
  return updateObject(state, {
    error: null, 
    loading: true
  });
}

const authUserComplete = (state, action) => {
  return updateObject(state, {
    token: action.token,
    userId: action.userId,
    error: null, 
    loading: false
  });
}

const authUserFailed = (state, action) => {
  let errorMessage = "";
  switch(action.error) {
    case "EMAIL_NOT_FOUND": 
      errorMessage = "Email not found.";
      break;
    case "INVALID_PASSWORD": 
      errorMessage = "Invalid password.";
      break;
    case "TOO_MANY_ATTEMPTS_TRY_LATER":
      errorMessage = "Too many failed attempts. Please try again later.";
      break;
    default: errorMessage = "Unknown error. Please try again later or contact the admin.";
  }
  return updateObject(state, {
    error: errorMessage, 
    loading: false
  });
}

const authLogoutComplete = (state, action) => {
  return updateObject(state, {
    token: null, 
    userId: null
  });
}

const getUserInfoComplete = (state, action) => {
  return updateObject(state, {
    userData: action.userData
  });
}

const getUserInfoFailed = (state, action) => {
  return updateObject(state, {
    error: action.error
  });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_USER_START: return authUserStart(state, action);
    case actionTypes.AUTH_USER_COMPLETE: return authUserComplete(state, action);
    case actionTypes.AUTH_USER_FAILED: return authUserFailed(state, action);
    case actionTypes.AUTH_LOGOUT_COMPLETE: return authLogoutComplete(state, action);
    case actionTypes.GET_USER_INFO_COMPLETE: return getUserInfoComplete(state, action);
    case actionTypes.GET_USER_INFO_FAILED: return getUserInfoFailed(state, action);
    default: return state;
  }
}

export default reducer;