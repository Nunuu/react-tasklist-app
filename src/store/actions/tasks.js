import * as actionTypes from './actionTypes';

// Add Tasks
export const addTask = (data) => {
  return {
    type: actionTypes.ADD_TASK,
    data
  }
}

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

// Edit Task
export const editTask = (id, data) => {
  return {
    type: actionTypes.EDIT_TASK,
    id,
    data
  }
}

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

export const hideAddForm = (data = null) => {
  return {
    type: actionTypes.HIDE_ADD_FORM,
    data
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