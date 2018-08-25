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

const getProjectsStart = (state, action) => {
  return updateObject(state, {
    loading: true
  });
}

const getProjectsComplete = (state, action) => {
  const allProjects = action.projects;
  const sortedProjects = Object.keys(allProjects)
    // .sort((a, b) => allProjects[a].order - allProjects[b].order)
    .reduce((sortedObj, key) => ({
      ...sortedObj, 
      [key]: allProjects[key]
    }), {});

  return updateObject(state, {
    projects: sortedProjects,
    loading: false,
    error: null
  });
}

const getProjectsFailed = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error
  });
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

const clearProjects = (state, action) => {
  return updateObject(state, {
    projects: {}
  });
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.GET_PROJECTS_START: return getProjectsStart(state, action);
    case actionTypes.GET_PROJECTS_COMPLETE: return getProjectsComplete(state, action);
    case actionTypes.GET_PROJECTS_FAILED: return getProjectsFailed(state, action);
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
    case actionTypes.CLEAR_PROJECTS: return clearProjects(state, action);
    default: return state;
  }
};

export default reducer;