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
