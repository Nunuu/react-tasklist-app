import { put, select } from 'redux-saga/effects';

import axios from '../../axios-firebase';
import * as actions from '../actions/';

const getTasks = (state) => state.tasks.tasks;
const getUserId = (state) => state.auth.userId;

export function* getTasksSaga(action) {
  yield put(actions.getTasksStart());
  try {
    const userId = yield select(getUserId);
    const response = yield axios.get(`/users/${userId}/tasks.json?orderBy="completed"&equalTo=false`);
    yield put(actions.getTasksComplete(response.data));
  } catch (error) {
    yield put(actions.getTasksFailed(error));
  }
}

export function* getCompletedTasksSaga(action) {
  yield put(actions.getTasksStart());
  try {
    const userId = yield select(getUserId);
    const response = yield axios.get(`/users/${userId}/tasks.json?orderBy="completed"&equalTo=true`);
    yield put(actions.getTasksComplete(response.data));
  } catch (error) {
    yield put(actions.getTasksFailed(error));
  }
}

export function* getTotalCountSaga(action) {
  try {
    const response = yield axios.get(`/users/${action.userId}/tasks.json?shallow=true`);
    yield put(actions.getTotalCountComplete(response.data));
  } catch (error) {
    yield put(actions.getTotalCountFailed(error));
  }
}

export function* addTaskSaga(action) {
  const newTask = {
    ...action.data,
    completed: false,
    order: 0
  }
  try {
    const userId = yield select(getUserId);
    const response = yield axios.post(`/users/${userId}/tasks.json`, newTask);
    yield put(actions.addTaskComplete(response.data.name, newTask));
    yield put(actions.hideAddForm());
  } catch (error) {
    yield put(actions.addTaskFailed(error));
  }
}

export function* deleteTaskSaga(action) {
  try {
    const userId = yield select(getUserId);
    yield axios.delete(`/users/${userId}/tasks/${action.id}.json`);
    yield put(actions.deleteTaskComplete(action.id));
    yield put(actions.hideDeleteConfirm());
  } catch (error) {
    yield put(actions.deleteTaskFailed(error));
  }
}

export function* editTaskSaga(action) {
  try {
    const userId = yield select(getUserId);
    const response = yield(axios.put(`/users/${userId}/tasks/${action.id}.json`, action.data));
    yield put(actions.editTaskComplete(action.id, response.data));
    yield put(actions.hideEditForm(true));
  } catch (error) {
    yield put(actions.editTaskFailed(error));
  }
}

export function* patchTaskSaga(action) {
  try {
    const userId = yield select(getUserId);
    yield(axios.patch(`/users/${userId}/tasks/${action.id}.json`, action.data));
    yield put(actions.editTaskComplete(action.id, action.data));
  } catch (error) {
    yield put(actions.editTaskFailed(error));
  }
}

// Reorder tasks
export function* rearrangeTasksSaga(action) {
  yield put(actions.rearrangeTasksStart(action.tasksArray));
  const newTasks = yield select(getTasks);
  try {
    const userId = yield select(getUserId);
    yield(axios.patch(`/users/${userId}/tasks.json`, newTasks));
    yield put(actions.rearrangeTasksComplete());
  } catch (error) {
    yield put(actions.rearrangeTasksFailed(error));
  }
}