import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import styles from './Tasks.scss';
import icons from '../../../assets/styles/linearicons.scss';

import Task from './Task/Task';
import * as actions from '../../../store/actions/';
import Button from '../../ui/Button/Button';

const tasks = props => {
  
  const tasks = props.tasks;
  let taskList = null;
  if (tasks) {
    taskList = Object.keys(tasks).map(key => {
      return <Task 
        key={key} 
        title={tasks[key].title}
        priority={tasks[key].priority}
        completed={tasks[key].completed}
        completionDate={tasks[key].completionDate}
        completeTask={() => props.onCompleteTask(key)}
        deleteTask={() => props.onDeleteTask(key)}
        editTask={() => props.onShowEditForm(key)} />
    });
  }

  let addButton = null;
  if (!props.hideAdd) {
    addButton = <Button 
      clicked={() => props.onShowAddForm(props.initDay)}>
      <span className={classNames(icons.lnr, icons["lnr-plus"])}></span>
    </Button>
  }
    
  return (
    <div className={styles.taskBlock}>
      <h2 style={{color: props.color}}>{props.title}</h2>
      {addButton}
      <div>
        {taskList}
      </div>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    onDeleteTask: (id) => dispatch(actions.deleteTask(id)),
    onShowEditForm: (id) => dispatch(actions.showEditForm(id)),
    onShowAddForm: (initDay) => dispatch(actions.showAddForm(initDay)),
    onCompleteTask: (id) => dispatch(actions.completeTask(id))
  }
}

export default connect(null, mapDispatchToProps)(tasks);