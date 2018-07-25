import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/helpers';

const initialState = {
  tasks: {},
  count: 0,
  loadingData: false,
  error: null,

  showAdd: false,
  showEdit: false,
  taskId: '',
  taskData: null,
  newTaskData: null,
}

const addTaskComplete = (state, action) => {
  const updatedTasks = updateObject(state.tasks, {
    [action.id]: action.data
  });
  return updateObject(state, {
    tasks: updatedTasks,
    count: state.count + 1,
    error: null
  });
}

const addTaskFailed = (state, action) => {
  return updateObject(state, {
    error: action.error
  });
}

const getTasksStart = (state, action) => {
  return updateObject(state, {
    loadingData: true
  });
}

const getTasksComplete = (state, action) => {
  const allTasks = action.tasks;
  return updateObject(state, {
    tasks: allTasks,
    count: allTasks ? Object.keys(allTasks).length : 0,
    loadingData: false,
    error: null
  });
}

const getTasksFailed = (state, action) => {
  return updateObject(state, {
    loadingData: false,
    error: action.error
  });
}

const deleteTaskComplete = (state, action) => {
  const { [action.id]: deleted, ...updatedTasks } = state.tasks;
  return updateObject(state, {
    tasks: updatedTasks,
    count: state.count - 1,
    error: null
  });
}

const deleteTaskFailed = (state, action) => {
  return updateObject(state, {
    error: action.error
  });
}

const editTaskComplete = (state, action) => {
  const updatedTasks = updateObject(state.tasks, {
    [action.id]: updateObject(state.tasks[action.id], action.data)
  });
  return updateObject(state, {
    tasks: updatedTasks,
    error: null
  });
}

const editTaskFailed = (state, action) => {
  return updateObject(state, {
    error: action.error
  });
}


//Forms
const showAddForm = (state, action) => {
  if (state.newTaskData && action.date === state.dueDate) {
    return updateObject(state, {
      showAdd: true
    });
  } else {
    return updateObject(state, {
      showAdd: true,
      newTaskData: {
        "priority": "normal",
        "dueDate": [action.date]
      }
    });
  }
}

const hideAddForm = (state, action) => {
  let newTaskData = null;
  if (action.data) {
    newTaskData = updateObject(state.newTaskData, action.data);
  }
  return updateObject(state, {
    showAdd: false,
    newTaskData
  });
}

const showEditForm = (state, action) => {
  let updatedState = {showEdit: true};
  if (state.taskId !== action.taskId) {
    updatedState.taskId = action.taskId;
    updatedState.taskData = state.tasks[action.taskId];
  }
  return updateObject(state, updatedState);
}

const hideEditForm = (state, action) => {
  let updatedState = {showEdit: false};
  if (action.reset) {
    updatedState.taskId = '';
    updatedState.taskData = null;
  }
  return updateObject(state, updatedState);
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_TASKS_START: return getTasksStart(state, action);
    case actionTypes.GET_TASKS_COMPLETE: return getTasksComplete(state, action);
    case actionTypes.GET_TASKS_FAILED: return getTasksFailed(state, action);
    case actionTypes.ADD_TASK_COMPLETE: return addTaskComplete(state, action);
    case actionTypes.ADD_TASK_FAILED: return addTaskFailed(state, action);
    case actionTypes.DELETE_TASK_COMPLETE: return deleteTaskComplete(state, action);
    case actionTypes.DELETE_TASK_FAILED: return deleteTaskFailed(state, action);
    case actionTypes.EDIT_TASK_COMPLETE: return editTaskComplete(state, action);
    case actionTypes.EDIT_TASK_FAILED: return editTaskFailed(state, action);
    case actionTypes.SHOW_ADD_FORM: return showAddForm(state, action);
    case actionTypes.HIDE_ADD_FORM: return hideAddForm(state, action);
    case actionTypes.SHOW_EDIT_FORM: return showEditForm(state, action);
    case actionTypes.HIDE_EDIT_FORM: return hideEditForm(state, action);
    default: return state;
  }
};

export default reducer;