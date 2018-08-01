import { put } from 'redux-saga/effects';
import axios from 'axios';

import * as actions from '../actions/';

export function* authUserSaga(action) {
  yield put(actions.authUserStart());
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true
  }
  const key = 'AIzaSyByGu20NDo95kPgcn9UaaTIreqjKxI_yzc';
  const url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + key;
  
  try {
    const response = yield axios.post(url, authData);

    const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
    yield localStorage.setItem("token", response.data.idToken);
    yield localStorage.setItem("expirationDate", expirationDate);
    yield localStorage.setItem("userId", response.data.localId);
    yield put(actions.authUserComplete(response.data.idToken, response.data.localId));
    yield put(actions.checkAuthTimeout(response.data.expiresIn));
  } catch (error) {
    yield put(actions.authUserFailed(error.response.data.error));
  }
}