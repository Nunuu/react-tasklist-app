import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { addTaskSaga, getTasksSaga } from './tasks';

export function* watchTasks() {
  yield takeEvery(actionTypes.ADD_TASK, addTaskSaga);
  yield takeEvery(actionTypes.GET_TASKS, getTasksSaga);
}