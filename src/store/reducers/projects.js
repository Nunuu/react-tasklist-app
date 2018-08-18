import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/helpers';

const initialState = {
  projects: {},
  loading: false,
  error: null,
  projectId: ''
}

const addProjectComplete = (state, action) => {
  const updatedProjects = updateObject(state.projects, {
    [action.id]: action.data
  });
  return updateObject(state, {
    projects: updatedProjects,
    error: null
  });
}

const addProjectFailed = (state, action) => {
  return updateObject(state, {
    error: action.error
  });
}

const editProjectComplete = (state, action) => {
  const updatedProjects = updateObject(state.projects, {
    [action.id]: updateObject(state.projects[action.id], action.data)
  });
  return updateObject(state, {
    projects: updatedProjects,
    error: null
  });
}

const editProjectFailed = (state, action) => {
  return updateObject(state, {
    error: action.error
  });
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.ADD_PROJECT_COMPLETE: return addProjectComplete(state, action);
    case actionTypes.ADD_PROJECT_FAILED: return addProjectFailed(state, action);
    case actionTypes.EDIT_PROJECT_COMPLETE: return editProjectComplete(state, action);
    case actionTypes.EDIT_PROJECT_FAILED: return editProjectFailed(state, action);
    default: return state;
  }
};

export default reducer;