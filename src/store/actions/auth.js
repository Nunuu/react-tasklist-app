import * as actionTypes from './actionTypes';

export const authUser = (values) => {
  return {
    type: actionTypes.AUTH_USER,
    email: values.email,
    password: values.password
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
    token,
    userId
  }
};

export const authUserFailed = (error) => {
  return {
    type: actionTypes.AUTH_USER_FAILED,
    error
  }
};

export const authCheckState = () => {
  return {
    type: actionTypes.AUTH_CHECK_STATE
  }
};

export const checkAuthTimeout = (expirationTime) => {
  return {
    type: actionTypes.AUTH_CHECK_TIMEOUT,
    expirationTime
  }
};

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  }
};

export const logoutComplete = () => {
  return {
    type: actionTypes.AUTH_LOGOUT_COMPLETE
  }
}

export const getUserInfo = (userId) => {
  return {
    type: actionTypes.GET_USER_INFO,
    userId
  }
};

export const getUserInfoComplete = (userData) => {
  return {
    type: actionTypes.GET_USER_INFO_COMPLETE,
    userData
  }
};

export const getUserInfoFailed = (error) => {
  return {
    type: actionTypes.GET_USER_INFO_FAILED,
    error
  }
};