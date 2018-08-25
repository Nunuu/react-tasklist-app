import { delay } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import axios from 'axios';

import * as actions from '../actions/';

export function* authUserSaga(action) {
  yield put(actions.authUserStart());
  
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true
  }
  const key = 'AIzaSyCfmH-j0r54oZLKOhNgPfH6AuhKrw2PXUo';
  const url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + key;
  
  try {
    const response = yield axios.post(url, authData);
    const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
    const userId = response.data.localId;
    yield localStorage.setItem("token", response.data.idToken);
    yield localStorage.setItem("expirationDate", expirationDate);
    yield localStorage.setItem("userId", userId);
    yield put(actions.authUserComplete(response.data.idToken, userId));
    yield put(actions.checkAuthTimeout(response.data.expiresIn));
    yield put(actions.getUserInfo(userId));
    yield put(actions.getTotalCount(userId));
  } catch (error) {
    yield put(actions.authUserFailed(error.response.data.error.message));
  }
}

export function* authCheckStateSaga(action) {
  const token = yield localStorage.getItem("token");
  if (!token) {
    yield put(actions.logout());
  } else {
    const expirationDate = yield new Date(localStorage.getItem("expirationDate"));
    if (expirationDate <= new Date()) {
      yield put(actions.logout());
    } else {
      const userId = yield localStorage.getItem("userId");
      yield put(actions.authUserComplete(token, userId));
      yield put(actions.checkAuthTimeout(
        (expirationDate.getTime() - new Date().getTime()) / 1000
      ));
      yield put(actions.getUserInfo(userId));
      yield put(actions.getTotalCount(userId));
    }
  }
}

export function* logoutSaga(action) {
  yield call([localStorage, 'removeItem'], "token");
  yield call([localStorage, 'removeItem'], "expirationDate");
  yield call([localStorage, 'removeItem'], "userId");
  yield put(actions.logoutComplete());

  // Hide all the popups
  yield put(actions.hideAddForm());
  yield put(actions.hideEditForm());
  yield put(actions.hideDeleteConfirm());
  yield put(actions.hideProjectAddForm());
  yield put(actions.hideProjectEditForm());
  yield put(actions.hideProjectDeleteConfirm());

  // Clear all the data
  yield put(actions.clearTasks());
  yield put(actions.clearProjects());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout());
}

export function* getUserInfoSaga(action) {
  try {
    const response = yield axios.get(`https://task-list-cbe78.firebaseio.com/users/${action.userId}/info.json`);
    yield put(actions.getUserInfoComplete(response.data));
  } catch (error) {
    yield put(actions.getUserInfoFailed(error));
  }
}