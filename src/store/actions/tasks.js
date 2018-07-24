import * as actionTypes from './actionTypes';

// Add Tasks
export const addTask = (data) => {
  return {
    type: actionTypes.ADD_TASK,
    data
  }
}

// export const addTaskStart = () => {
//   return {
//     type: actionTypes.ADD_TASK_START
//   }
// }

export const addTaskComplete = (id, data) => {
  return {
    type: actionTypes.ADD_TASK_COMPLETE,
    id,
    data
  }
}

export const addTaskFailed = (error) => {
  return {
    type: actionTypes.ADD_TASK_FAILED,
    error
  }
}

// Delete Task
export const deleteTask = (id) => {
  return {
    type: actionTypes.DELETE_TASK,
    id
  }
}

// export const deleteTaskStart = () => {
//   return {
//     type: actionTypes.DELETE_TASK_START
//   }
// }

export const deleteTaskComplete = (id) => {
  return {
    type: actionTypes.DELETE_TASK_COMPLETE,
    id
  }
}

export const deleteTaskFailed = (error) => {
  return {
    type: actionTypes.DELETE_TASK_FAILED,
    error
  }
}

// Complete Task
export const completeTask = (id) => {
  return {
    type: actionTypes.COMPLETE_TASK,
    id
  }
}

// export const completeTaskComplete = (id, data) => {
//   return {
//     type: actionTypes.COMPLETE_TASK_COMPLETE,
//     id,
//     data
//   }
// }

// export const completeTaskFailed = (error) => {
//   return {
//     type: actionTypes.COMPLETE_TASK_FAILED,
//     error
//   }
// }

// Edit Task
export const editTask = (id, data) => {
  return {
    type: actionTypes.EDIT_TASK,
    id,
    data
  }
}

// export const editTaskStart = () => {
//   return {
//     type: actionTypes.EDIT_TASK_START
//   }
// }

export const editTaskComplete = (id, data) => {
  return {
    type: actionTypes.EDIT_TASK_COMPLETE,
    id,
    data
  }
}

export const editTaskFailed = (error) => {
  return {
    type: actionTypes.EDIT_TASK_FAILED,
    error
  }
}


// Get Tasks
export const getTasks = () => {
  return {
    type: actionTypes.GET_TASKS
  }
}

export const getTasksStart = () => {
  return {
    type: actionTypes.GET_TASKS_START
  }
}

export const getTasksComplete = (tasks) => {
  return {
    type: actionTypes.GET_TASKS_COMPLETE,
    tasks
  }
}

export const getTasksFailed = (error) => {
  return {
    type: actionTypes.GET_TASKS_FAILED,
    error
  }
}


// Forms
export const showAddForm = (date = "", project = "") => {
  return {
    type: actionTypes.SHOW_ADD_FORM,
    date,
    project
  }
}

export const hideAddForm = (reset = false) => {
  return {
    type: actionTypes.HIDE_ADD_FORM,
    reset
  }
}

export const showEditForm = (taskId) => {
  return {
    type: actionTypes.SHOW_EDIT_FORM,
    taskId
  }
}

export const hideEditForm = (reset = false) => {
  return {
    type: actionTypes.HIDE_EDIT_FORM,
    reset
  }
}