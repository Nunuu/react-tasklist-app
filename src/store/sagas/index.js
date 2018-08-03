import { takeEvery, all, takeLatest } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { addTaskSaga, getTasksSaga, deleteTaskSaga, editTaskSaga, getCompletedTasksSaga, getTotalCountSaga, patchTaskSaga, rearrangeTasksSaga } from './tasks';
import { authUserSaga, logoutSaga, checkAuthTimeoutSaga, authCheckStateSaga, getUserInfoSaga } from './auth';

export function* watchTasks() {
  yield all([
    takeEvery(actionTypes.GET_TASKS, getTasksSaga),
    takeEvery(actionTypes.GET_COMPLETED_TASKS, getCompletedTasksSaga),
    takeEvery(actionTypes.GET_TOTAL_COUNT, getTotalCountSaga),
    takeEvery(actionTypes.ADD_TASK, addTaskSaga),
    takeLatest(actionTypes.DELETE_TASK, deleteTaskSaga),
    takeEvery(actionTypes.EDIT_TASK, editTaskSaga),
    takeLatest(actionTypes.COMPLETE_TASK, patchTaskSaga),
    takeLatest(actionTypes.UNCOMPLETE_TASK, patchTaskSaga),
    takeLatest(actionTypes.REARRANGE_TASKS, rearrangeTasksSaga)
  ]);
}

export function* watchAuth() {
  yield all([
    takeEvery(actionTypes.AUTH_LOGOUT, logoutSaga),
    takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
    takeEvery(actionTypes.AUTH_USER, authUserSaga),
    takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga),
    takeEvery(actionTypes.GET_USER_INFO, getUserInfoSaga)
  ]);
}