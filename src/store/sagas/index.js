import { takeEvery, all, takeLatest } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { addTaskSaga, getTasksSaga, deleteTaskSaga, editTaskSaga, completeTaskSaga } from './tasks';

export function* watchTasks() {
  yield all([
    takeEvery(actionTypes.GET_TASKS, getTasksSaga),
    takeEvery(actionTypes.ADD_TASK, addTaskSaga),
    takeLatest(actionTypes.DELETE_TASK, deleteTaskSaga),
    takeEvery(actionTypes.EDIT_TASK, editTaskSaga),
    takeLatest(actionTypes.COMPLETE_TASK, completeTaskSaga)
  ]);
}