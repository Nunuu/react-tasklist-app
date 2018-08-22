import { put, select } from 'redux-saga/effects';

import axios from '../../axios-firebase';
import * as actions from '../actions/';

const getUserId = (state) => state.auth.userId;

export function* getProjectsSaga(action) {
  yield put(actions.getProjectsStart());
  try {
    const userId = yield select(getUserId);
    const response = yield axios.get(`/users/${userId}/projects.json?orderBy="completed"&equalTo=false`);
    yield put(actions.getProjectsComplete(response.data));
  } catch (error) {
    yield put(actions.getProjectsFailed(error));
  }
}

export function* addProjectSaga(action) {
  const newProject = {
    ...action.data,
    completed: false,
    order: 0
  }
  try {
    const userId = yield select(getUserId);
    const response = yield axios.post(`/users/${userId}/projects.json`, newProject);
    yield put(actions.addProjectComplete(response.data.name, newProject));
    yield put(actions.hideProjectAddForm());
  } catch (error) {
    yield put(actions.addProjectFailed(error));
  }
}

export function* editProjectSaga(action) {
  try {
    const userId = yield select(getUserId);
    const response = yield(axios.put(`/users/${userId}/projects/${action.id}.json`, action.data));
    yield put(actions.editProjectComplete(action.id, response.data));
    yield put(actions.hideProjectEditForm(true));
  } catch (error) {
    yield put(actions.editProjectFailed(error));
  }
}

export function* deleteProjectSaga(action) {
  try {
    const userId = yield select(getUserId);
    yield axios.delete(`/users/${userId}/projects/${action.id}.json`);
    yield put(actions.deleteProjectComplete(action.id));
    yield put(actions.hideProjectDeleteConfirm());
  } catch (error) {
    yield put(actions.deleteProjectFailed(error));
  }
}
