import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/helpers';

const initialState = {
  tasks: [],
  count: 0,
  loadingData: false,
  error: null,

  showAdd: false,
  initDate: '',
  showEdit: false,
  taskId: '',
  taskData: null
}

// const addTaskStart = (state, action) => {
//   return updateObject(state, {
//     loading: true,
//     error: null
//   });
// }

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
    count: allTasks.length,
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

// const deleteTaskStart = (state, action) => {
//   return updateObject(state, {
//     loading: true,
//     error: null
//   });
// }

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

// const editTaskStart = (state, action) => {
//   return updateObject(state, {
//     loading: true,
//     error: null
//   });
// }

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
  return updateObject(state, {
    showAdd: true,
    initDate: action.initDate
  });
}

const hideAddForm = (state, action) => {
  return updateObject(state, {
    showAdd: false,
  });
}

const showEditForm = (state, action) => {
  return updateObject(state, {
    taskId: action.taskId,
    taskData: state.tasks[action.taskId],
    showEdit: true
  })
}

const hideEditForm = (state, action) => {
  return updateObject(state, {
    taskId: action.reset ? '' : state.taskId,
    taskData: action.reset ? null : state.taskData,
    showEdit: false
  });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_TASKS_START: return getTasksStart(state, action);
    case actionTypes.GET_TASKS_COMPLETE: return getTasksComplete(state, action);
    case actionTypes.GET_TASKS_FAILED: return getTasksFailed(state, action);
    // case actionTypes.ADD_TASK_START: return addTaskStart(state, action);
    case actionTypes.ADD_TASK_COMPLETE: return addTaskComplete(state, action);
    case actionTypes.ADD_TASK_FAILED: return addTaskFailed(state, action);
    // case actionTypes.DELETE_TASK_START: return deleteTaskStart(state, action);
    case actionTypes.DELETE_TASK_COMPLETE: return deleteTaskComplete(state, action);
    case actionTypes.DELETE_TASK_FAILED: return deleteTaskFailed(state, action);
    // case actionTypes.EDIT_TASK_START: return editTaskStart(state, action);
    case actionTypes.EDIT_TASK_COMPLETE: return editTaskComplete(state, action);
    case actionTypes.EDIT_TASK_FAILED: return editTaskFailed(state, action);
    // case actionTypes.COMPLETE_TASK_COMPLETE: return completeTaskComplete(state, action);
    // case actionTypes.COMPLETE_TASK_FAILED: return completeTaskFailed(state, action);
    case actionTypes.SHOW_ADD_FORM: return showAddForm(state, action);
    case actionTypes.HIDE_ADD_FORM: return hideAddForm(state, action);
    case actionTypes.SHOW_EDIT_FORM: return showEditForm(state, action);
    case actionTypes.HIDE_EDIT_FORM: return hideEditForm(state, action);
    default: return state;
  }
};

export default reducer;