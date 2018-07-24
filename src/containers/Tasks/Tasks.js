import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import styles from './Tasks.scss';
import icons from '../../assets/styles/linearicons.scss';

import Task from '../../components/lists/Task/Task';
import * as actions from '../../store/actions/';

class Tasks extends Component {
  
  render() {
    const tasks = this.props.tasks;
    let taskList = null;
    if (tasks) {
      taskList = Object.keys(tasks).map(key => {
        return <Task 
          key={key} 
          title={tasks[key].title}
          priority={tasks[key].priority}
          completed={tasks[key].completed}
          completeTask={() => this.props.onCompleteTask(key)}
          deleteTask={() => this.props.onDeleteTask(key)}
          editTask={() => this.props.onShowEditForm(key)} />
      });
    }
    
    return (
      <div className={styles.taskBlock}>
        <h2 style={{color: this.props.color}}>{this.props.title}</h2>
        <button onClick={() => this.props.onShowAddForm(this.props.initDay)}>
          <span className={classNames(icons.lnr, icons["lnr-plus"])}></span>
        </button>
        <div className="tasks">
          {taskList}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onDeleteTask: (id) => dispatch(actions.deleteTask(id)),
    onShowEditForm: (id) => dispatch(actions.showEditForm(id)),
    onShowAddForm: (initDay) => dispatch(actions.showAddForm(initDay)),
    onCompleteTask: (id) => dispatch(actions.completeTask(id))
  }
}

export default connect(null, mapDispatchToProps)(Tasks);