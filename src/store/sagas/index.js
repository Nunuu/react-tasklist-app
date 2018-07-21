import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { addTaskSaga, getTasksSaga, deleteTaskSaga, editTaskSaga } from './tasks';

export function* watchTasks() {
  yield takeEvery(actionTypes.ADD_TASK, addTaskSaga);
  yield takeEvery(actionTypes.GET_TASKS, getTasksSaga);
  yield takeEvery(actionTypes.DELETE_TASK, deleteTaskSaga);
  yield takeEvery(actionTypes.EDIT_TASK, editTaskSaga);
}