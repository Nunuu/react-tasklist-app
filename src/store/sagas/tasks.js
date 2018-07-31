import { put, select } from 'redux-saga/effects';

import axios from '../../axios-firebase';
import * as actions from '../actions/';

export function* getTasksSaga(action) {
  yield put(actions.getTasksStart());
  try {
    const response = yield axios.get('/tasks.json?orderBy="completed"&equalTo=false');
    yield put(actions.getTasksComplete(response.data));
  } catch (error) {
    yield put(actions.getTasksFailed(error));
  }
}

export function* getCompletedTasksSaga(action) {
  yield put(actions.getTasksStart());
  try {
    const response = yield axios.get('/tasks.json?orderBy="completed"&equalTo=true');
    yield put(actions.getTasksComplete(response.data));
  } catch (error) {
    yield put(actions.getTasksFailed(error));
  }
}

export function* getTotalCountSaga(action) {
  try {
    const response = yield axios.get('/tasks.json?shallow=true');
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
    const response = yield axios.post('/tasks.json', newTask);
    yield put(actions.addTaskComplete(response.data.name, newTask));
    yield put(actions.hideAddForm());
  } catch (error) {
    yield put(actions.addTaskFailed(error));
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

export function* patchTaskSaga(action) {
  try {
    yield(axios.patch(`/tasks/${action.id}.json`, action.data));
    yield put(actions.editTaskComplete(action.id, action.data));
  } catch (error) {
    yield put(actions.editTaskFailed(error));
  }
}

// Reorder tasks
export const getTasks = (state) => state.tasks.tasks;

export function* rearrangeTasksSaga(action) {
  yield put(actions.rearrangeTasksStart(action.tasksArray));
  const newTasks = yield select(getTasks);
  try {
    yield(axios.patch(`/tasks.json`, newTasks));
    yield put(actions.rearrangeTasksComplete());
  } catch (error) {
    yield put(actions.rearrangeTasksFailed(error));
  }
}

/*export function* rearrangeTaskListsSaga(action) {
  yield put(actions.rearrangeTaskListsStart(action.taskLists));
  const newTasks = yield select(getTasks);
  try {
    yield(axios.patch(`/tasks.json`, newTasks));
    yield put(actions.rearrangeTasksComplete());
  } catch (error) {
    yield put(actions.rearrangeTasksFailed(error));
  }
}*/