import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/helpers';

const initialState = {
  tasks: [],
  count: 0,
  loading: false,
  error: null
}

const addTaskStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    error: null
  });
}

const addTaskComplete = (state, action) => {
  const newTask = updateObject(action.task, {id: action.id});
  return updateObject(state, {
    tasks: state.tasks.concat(newTask),
    count: state.count + 1,
    loading: false
  });
}

const addTaskFailed = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error
  });
}

const getTasksStart = (state, action) => {
  return updateObject(state, {loading: true});
}

const getTasksComplete = (state, action) => {
  const allTasks = action.tasks;
  return updateObject(state, {
    tasks: allTasks,
    count: allTasks.length,
    loading: false
  });
}

const getTasksFailed = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error
  });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TASK_START: return addTaskStart(state, action);
    case actionTypes.ADD_TASK_COMPLETE: return addTaskComplete(state, action);
    case actionTypes.ADD_TASK_FAILED: return addTaskFailed(state, action);
    case actionTypes.GET_TASKS_START: return getTasksStart(state, action);
    case actionTypes.GET_TASKS_COMPLETE: return getTasksComplete(state, action);
    case actionTypes.GET_TASKS_FAILED: return getTasksFailed(state, action);
    default: return state;
  }
};

export default reducer;