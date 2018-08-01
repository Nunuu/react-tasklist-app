import * as actionTypes from './actionTypes';

export const authUser = () => {
  return {
    type: actionTypes.AUTH_USER
  }
};

export const authUserStart = () => {
  return {
    type: actionTypes.AUTH_USER_START
  }
};

export const authUserComplete = (token, userId) => {
  return {
    type: actionTypes.AUTH_USER_COMPLETE,
    idToken: token,
    userId
  }
};

export const authUserFailed = (error) => {
  return {
    type: actionTypes.AUTH_USER_FAILED,
    error
  }
};

export const checkAuthTimeout = (expirationTime) => {
  return {
    type: actionTypes.AUTH_CHECK_TIMEOUT,
    expirationTime
  }
};
