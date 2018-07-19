import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/helpers';

const initialState = {
  tasks: [],
  count: 0,
  loading: false
}

const addTaskComplete = (state, action) => {
  const newTask = updateObject(action.task, {id: action.id});
  return updateObject(state, {
    tasks: state.tasks.concat(newTask),
    count: state.count + 1,
    loading: false
  });
}

const addTaskFailed = (state, action) => {
  //TODO: add prompt with action.error message
  return updateObject(state, {loading: false});
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TASK_COMPLETE: return addTaskComplete(state, action);
    case actionTypes.ADD_TASK_FAILED: return addTaskFailed(state, action);
    default: return state;
  }
};

export default reducer;