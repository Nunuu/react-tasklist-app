import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/helpers';

const initialState = {
  showAdd: false,
  initDate: '',
  showEdit: false,
  taskId: ''
}

const showAddForm = (state, action) => {
  return updateObject(state, {
    showAdd: true,
    initDate: action.initDate
  });
}

const hideAddForm = (state, action) => {
  return updateObject(state, {
    showAdd: false,
  });
}

const showEditForm = (state, action) => {
  return updateObject(state, {
    taskId: action.taskId,
    showEdit: true,
  })
}

const hideEditForm = (state, action) => {
  return updateObject(state, {
    taskId: action.reset ? '': state.taskId,
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