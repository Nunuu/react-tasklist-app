import * as actionTypes from './actionTypes';

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