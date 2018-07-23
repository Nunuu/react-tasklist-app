import * as actionTypes from './actionTypes';

export const showAddForm = (date = "", project = "") => {
  return {
    type: actionTypes.SHOW_ADD_FORM,
    date,
    project
  }
}

export const hideAddForm = () => {
  return {
    type: actionTypes.HIDE_ADD_FORM
  }
}

export const showEditForm = (id) => {
  return {
    type: actionTypes.SHOW_EDIT_FORM,
    id
  }
}

export const hideEditForm = () => {
  return {
    type: actionTypes.HIDE_EDIT_FORM
  }
}