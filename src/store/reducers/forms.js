import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/helpers';

const initialState = {
  showAdd: false,
  initDay: '',
  initProject: '',
  showEdit: false,
  id: ''
}

const showAddForm = (state, action) => {
  return updateObject(state, {
    initDay: action.date,
    initProject: action.project,
    showAdd: true
  });
}

const hideAddForm = (state, action) => {
  return updateObject(state, {
    initDay: '',
    initProject: '',
    showAdd: false
  })
}

const showEditForm = (state, action) => {
  return updateObject(state, {
    id: action.id,
    showEdit: true
  })
}

const hideEditForm = (state, action) => {
  return updateObject(state, {
    id: '',
    showEdit: false
  });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_ADD_FORM: return showAddForm(state, action);
    case actionTypes.HIDE_ADD_FORM: return hideAddForm(state, action);
    case actionTypes.SHOW_EDIT_FORM: return showEditForm(state, action);
    case actionTypes.HIDE_EDIT_FORM: return hideEditForm(state, action);
    default: return state;
  }
};

export default reducer;