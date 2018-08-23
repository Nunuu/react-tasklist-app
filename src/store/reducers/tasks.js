import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/helpers';

const initialState = {
  tasks: {},
  count: 0,
  loading: false,
  error: null,
  showAdd: false,
  showEdit: false,
  showDelete: false,
  taskId: '',
  taskData: null,
  newTaskData: null
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
    loading: true
  });
}

const getTasksComplete = (state, action) => {
  const allTasks = action.tasks;
  const sortedTasks = Object.keys(allTasks)
    // .sort((a, b) => allTasks[a].order - allTasks[b].order)
    .reduce((sortedObj, key) => ({
      ...sortedObj, 
      [key]: allTasks[key]
    }), {});

  return updateObject(state, {
    tasks: sortedTasks,
    loading: false,
    error: null
  });
}

const getTasksFailed = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error
  });
}

const getTotalCountComplete = (state, action) => {
  const allTasks = action.tasks;
  return updateObject(state, {
    count: allTasks ? Object.keys(allTasks).length : 0
  });
}

const getTotalCountFailed = (state, action) => {
  return updateObject(state, {
    count: 0,
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

const rearrangeTasksStart = (state, action) => {
  let updatedTasks = {...state.tasks};  
  action.tasksArray.forEach((task, index) => {
    const updateProperty = action.sortProject ? {
      projectSort: index + 1,
      project: task.project
    } : {
      order: index + 1,
      dueDate: task.dueDate
    }
    updatedTasks = updateObject(updatedTasks, {
      [task.id]: updateObject(state.tasks[task.id], updateProperty)
    });
  });
  return updateObject(state, {
    tasks: updatedTasks
  });
}

const rearrangeTasksComplete = (state, action) => {
  return updateObject(state, {
    error: null
  });
}

const rearrangeTasksFailed = (state, action) => {
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
        "dueDate": action.date ? [action.date] : null,
        "project": action.project
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

const showDeleteConfirm = (state, action) => {
  return updateObject(state, {
    taskId: action.taskId,
    showDelete: true
  });
}

const hideDeleteConfirm = (state, action) => {
  return updateObject(state, {
    taskId: "",
    showDelete: false
  });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_TASKS_START: return getTasksStart(state, action);
    case actionTypes.GET_TASKS_COMPLETE: return getTasksComplete(state, action);
    case actionTypes.GET_TASKS_FAILED: return getTasksFailed(state, action);
    case actionTypes.GET_TOTAL_COUNT_COMPLETE: return getTotalCountComplete(state, action);
    case actionTypes.GET_TOTAL_COUNT_FAILED: return getTotalCountFailed(state, action);
    case actionTypes.ADD_TASK_COMPLETE: return addTaskComplete(state, action);
    case actionTypes.ADD_TASK_FAILED: return addTaskFailed(state, action);
    case actionTypes.DELETE_TASK_COMPLETE: return deleteTaskComplete(state, action);
    case actionTypes.DELETE_TASK_FAILED: return deleteTaskFailed(state, action);
    case actionTypes.EDIT_TASK_COMPLETE: return editTaskComplete(state, action);
    case actionTypes.EDIT_TASK_FAILED: return editTaskFailed(state, action);
    case actionTypes.REARRANGE_TASKS_START: return rearrangeTasksStart(state, action);
    case actionTypes.REARRANGE_TASKS_COMPLETE: return rearrangeTasksComplete(state, action);
    case actionTypes.REARRANGE_TASKS_FAILED: return rearrangeTasksFailed(state, action);
    case actionTypes.SHOW_ADD_FORM: return showAddForm(state, action);
    case actionTypes.HIDE_ADD_FORM: return hideAddForm(state, action);
    case actionTypes.SHOW_EDIT_FORM: return showEditForm(state, action);
    case actionTypes.HIDE_EDIT_FORM: return hideEditForm(state, action);
    case actionTypes.SHOW_DELETE_CONFIRM: return showDeleteConfirm(state, action);
    case actionTypes.HIDE_DELETE_CONFIRM: return hideDeleteConfirm(state, action);
    default: return state;
  }
};

export default reducer;