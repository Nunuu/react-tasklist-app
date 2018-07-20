import * as actionTypes from './actionTypes';

// Add Tasks
export const addTask = (title, priority, dueDate) => {
  return {
    type: actionTypes.ADD_TASK,
    title,
    priority,
    dueDate
  }
}

export const addTaskStart = () => {
  return {
    type: actionTypes.ADD_TASK_START
  }
}

export const addTaskComplete = (id, task) => {
  return {
    type: actionTypes.ADD_TASK_COMPLETE,
    id,
    task
  }
}

export const addTaskFailed = (error) => {
  return {
    type: actionTypes.ADD_TASK_FAILED,
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