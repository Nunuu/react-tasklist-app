import * as actionTypes from './actionTypes';

// Add Projects
export const addProject = (data) => {
  return {
    type: actionTypes.ADD_PROJECT,
    data
  }
}

export const addProjectComplete = (id, data) => {
  return {
    type: actionTypes.ADD_PROJECT_COMPLETE,
    id,
    data
  }
}

export const addProjectFailed = (error) => {
  return {
    type: actionTypes.ADD_PROJECT_FAILED,
    error
  }
}

// Edit Projects
export const editProject = (data) => {
  return {
    type: actionTypes.EDIT_PROJECT,
    data
  }
}

export const editProjectComplete = (id, data) => {
  return {
    type: actionTypes.EDIT_PROJECT_COMPLETE,
    id,
    data
  }
}

export const editProjectFailed = (error) => {
  return {
    type: actionTypes.EDIT_PROJECT_FAILED,
    error
  }
}

// Delete Project
export const deleteProject = (id) => {
  return {
    type: actionTypes.DELETE_PROJECT,
    id
  }
}

export const deleteProjectComplete = (id) => {
  return {
    type: actionTypes.DELETE_PROJECT_COMPLETE,
    id
  }
}

export const deleteProjectFailed = (error) => {
  return {
    type: actionTypes.DELETE_PROJECT_FAILED,
    error
  }
}


// Popups
export const showProjectAddForm = () => {
  return {
    type: actionTypes.SHOW_PROJECT_ADD_FORM
  }
}

export const hideProjectAddForm = (data = null) => {
  return {
    type: actionTypes.HIDE_PROJECT_ADD_FORM,
    data
  }
}

export const showProjectEditForm = (projectId) => {
  return {
    type: actionTypes.SHOW_PROJECT_EDIT_FORM,
    projectId
  }
}

export const hideProjectEditForm = (reset = false) => {
  return {
    type: actionTypes.HIDE_PROJECT_EDIT_FORM,
    reset
  }
}

export const showProjectDeleteConfirm = (projectId) => {
  return {
    type: actionTypes.SHOW_PROJECT_DELETE_CONFIRM,
    projectId
  }
}

export const hideProjectDeleteConfirm = () => {
  return {
    type: actionTypes.HIDE_PROJECT_DELETE_CONFIRM
  }
}