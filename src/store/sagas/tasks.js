import { put } from 'redux-saga/effects';

import axios from '../../axios-firebase';
import * as actions from '../actions/';

export function* addTaskSaga(action) {
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