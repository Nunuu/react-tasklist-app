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
    id,
    data: {
      "completed": "true",
      "completionDate": new Date()
    }
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

export const getCompletedTasks = () => {
  return {
    type: actionTypes.GET_COMPLETED_TASKS
  }
}

export const getTotalCount = () => {
  return {
    type: actionTypes.GET_TOTAL_COUNT
  }
}

export const getTotalCountComplete = (tasks) => {
  return {
    type: actionTypes.GET_TOTAL_COUNT_COMPLETE,
    tasks
  }
}

export const getTotalCountFailed = (error) => {
  return {
    type: actionTypes.GET_TOTAL_COUNT_FAILED,
    error
  }
}

export const rearrangeTasks = (tasksArray) => {
  return {
    type: actionTypes.REARRANGE_TASKS,
    tasksArray
  }
}

export const rearrangeTasksStart = (tasksArray) => {
  return {
    type: actionTypes.REARRANGE_TASKS_START,
    tasksArray
  }
}

export const rearrangeTasksComplete = () => {
  return {
    type: actionTypes.REARRANGE_TASKS_COMPLETE
  }
}

export const rearrangeTasksFailed = (error) => {
  return {
    type: actionTypes.REARRANGE_TASKS_FAILED,
    error
  }
}

// Forms
export const showAddForm = (date = null) => {
  return {
    type: actionTypes.SHOW_ADD_FORM,
    date
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