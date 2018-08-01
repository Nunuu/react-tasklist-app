import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/helpers';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false
}

const authUserStart = (state, action) => {
  return updateObject(state, {
    error: null, 
    loading: true
  });
}

const authUserComplete = (state, action) => {
  return updateObject(state, {
    token: action.idToken,
    userId: action.userId,
    error: null, 
    loading: false
  });
}

const authUserFailed = (state, action) => {
  return updateObject(state, {
    error: action.error, 
    loading: false
  });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_USER_START: return authUserStart(state, action);
    case actionTypes.AUTH_USER_COMPLETE: return authUserComplete(state, action);
    case actionTypes.AUTH_USER_FAILED: return authUserFailed(state, action);
    default: return state;
  }
}

export default reducer;