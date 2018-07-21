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
  const newTask = {
    "id": action.id,
    ...action.task
  };
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

const deleteTaskStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    error: null
  });
}

const deleteTaskComplete = (state, action) => {
  return updateObject(state, {
    tasks: state.tasks.filter(task => task.id !== action.id),
    count: state.count - 1,
    loading: false
  });
}

const deleteTaskFailed = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error
  });
}

const editTaskStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    error: null
  });
}

const editTaskComplete = (state, action) => {
  const tasks = [...state.tasks];
  const index = tasks.findIndex((task => task.id === action.id));
  tasks[index] = {
    id: action.id,
    ...action.data
  };
  return updateObject(state, {
    tasks: tasks,
    loading: false
  });
}

const editTaskFailed = (state, action) => {
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
    case actionTypes.DELETE_TASK_START: return deleteTaskStart(state, action);
    case actionTypes.DELETE_TASK_COMPLETE: return deleteTaskComplete(state, action);
    case actionTypes.DELETE_TASK_FAILED: return deleteTaskFailed(state, action);
    case actionTypes.EDIT_TASK_START: return editTaskStart(state, action);
    case actionTypes.EDIT_TASK_COMPLETE: return editTaskComplete(state, action);
    case actionTypes.EDIT_TASK_FAILED: return editTaskFailed(state, action);
    default: return state;
  }
};

export default reducer;