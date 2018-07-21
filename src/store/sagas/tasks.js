import { put } from 'redux-saga/effects';

import axios from '../../axios-firebase';
import * as actions from '../actions/';

export function* addTaskSaga(action) {
  yield put(actions.addTaskStart());
  const newTask = {
    title: action.title,
    priority: action.priority,
    dueDate: action.dueDate,
    completed: false
  }
  try {
    const response = yield axios.post('/tasks.json', newTask);
    yield put(actions.addTaskComplete(response.data.name, newTask));
  } catch (error) {
    yield put(actions.addTaskFailed(error));
  }
}

export function* getTasksSaga(action) {
  yield put(actions.getTasksStart());
  try {
    const response = yield axios.get('/tasks.json');
    const data = response.data;
    const tasks = Object.keys(data).map(key => {
      return {
        "id": key,
        ...data[key]
      }
    });
    yield put(actions.getTasksComplete(tasks));
  } catch (error) {
    yield put(actions.getTasksFailed(error));
  }
}

export function* deleteTaskSaga(action) {
  yield put(actions.deleteTaskStart());
  try {
    yield axios.post(`/tasks/${action.id}.json?x-http-method-override=DELETE`);
    yield put(actions.deleteTaskComplete(action.id));
  } catch (error) {
    yield put(actions.deleteTaskFailed(error));
  }
}

export function* editTaskSaga(action) {
  yield put(actions.editTaskStart());
  try {
    const response = yield(axios.put(`/tasks/${action.id}.json`, action.data));
    yield put(actions.editTaskComplete(action.id, response.data));
  } catch (error) {
    yield put(actions.editTaskFailed(error));
  }
}