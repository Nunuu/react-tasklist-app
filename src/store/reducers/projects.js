import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/helpers';

const initialState = {
  projects: {},
  loading: false,
  error: null,
  projectId: '',
  showAdd: false,
  showEdit: false,
  showDelete: false,
  projectData: null,
  newProjectData: null
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

//Forms
const showProjectAddForm = (state, action) => {
  return updateObject(state, {
    showAdd: true
  });
}

const hideProjectAddForm = (state, action) => {
  let newProjectData = null;
  if (action.data) {
    newProjectData = updateObject(state.newProjectData, action.data);
  }
  return updateObject(state, {
    showAdd: false,
    newProjectData
  });
}

const showProjectEditForm = (state, action) => {
  let updatedState = {showEdit: true};
  if (state.projectId !== action.projectId) {
    updatedState.projectId = action.projectId;
    updatedState.projectData = state.projects[action.projectId];
  }
  return updateObject(state, updatedState);
}

const hideProjectEditForm = (state, action) => {
  let updatedState = {showEdit: false};
  if (action.reset) {
    updatedState.projectId = '';
    updatedState.projectData = null;
  }
  return updateObject(state, updatedState);
}

const showProjectDeleteConfirm = (state, action) => {
  return updateObject(state, {
    projectId: action.projectId,
    showDelete: true
  });
}

const hideProjectDeleteConfirm = (state, action) => {
  return updateObject(state, {
    projectId: "",
    showDelete: false
  });
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.ADD_PROJECT_COMPLETE: return addProjectComplete(state, action);
    case actionTypes.ADD_PROJECT_FAILED: return addProjectFailed(state, action);
    case actionTypes.EDIT_PROJECT_COMPLETE: return editProjectComplete(state, action);
    case actionTypes.EDIT_PROJECT_FAILED: return editProjectFailed(state, action);
    case actionTypes.SHOW_PROJECT_ADD_FORM: return showProjectAddForm(state, action);
    case actionTypes.HIDE_PROJECT_ADD_FORM: return hideProjectAddForm(state, action);
    case actionTypes.SHOW_PROJECT_EDIT_FORM: return showProjectEditForm(state, action);
    case actionTypes.HIDE_PROJECT_EDIT_FORM: return hideProjectEditForm(state, action);
    case actionTypes.SHOW_PROJECT_DELETE_CONFIRM: return showProjectDeleteConfirm(state, action);
    case actionTypes.HIDE_PROJECT_DELETE_CONFIRM: return hideProjectDeleteConfirm(state, action);
    default: return state;
  }
};

export default reducer;