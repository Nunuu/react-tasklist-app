import { put } from 'redux-saga/effects';

import axios from '../../axios-firebase';
import * as actions from '../actions/';

export function* addTaskSaga(action) {
  const newTask = {
    ...action.data,
    completed: false
  }
  try {
    const response = yield axios.post('/tasks.json', newTask);
    yield put(actions.addTaskComplete(response.data.name, newTask));
    yield put(actions.hideAddForm(true));
  } catch (error) {
    yield put(actions.addTaskFailed(error));
  }
}

export function* getTasksSaga(action) {
  yield put(actions.getTasksStart());
  try {
    const response = yield axios.get('/tasks.json?');
    yield put(actions.getTasksComplete(response.data));
  } catch (error) {
    yield put(actions.getTasksFailed(error));
  }
}

export function* deleteTaskSaga(action) {
  try {
    yield axios.delete(`/tasks/${action.id}.json`);
    yield put(actions.deleteTaskComplete(action.id));
  } catch (error) {
    yield put(actions.deleteTaskFailed(error));
  }
}

export function* editTaskSaga(action) {
  try {
    const response = yield(axios.put(`/tasks/${action.id}.json`, action.data));
    yield put(actions.editTaskComplete(action.id, response.data));
    yield put(actions.hideEditForm(true));
  } catch (error) {
    yield put(actions.editTaskFailed(error));
  }
}

export function* completeTaskSaga(action) {
  const updateData = {"completed": true};
  try {
    yield(axios.patch(`/tasks/${action.id}.json`, updateData));
    yield put(actions.editTaskComplete(action.id, updateData));
  } catch (error) {
    yield put(actions.editTaskFailed(error));
  }
}