import * as actionTypes from './actionTypes';

export const addTask = (title, priority, dueDate) => {
  return {
    type: actionTypes.ADD_TASK,
    title,
    priority,
    dueDate
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

export const getTasks = () => {

}