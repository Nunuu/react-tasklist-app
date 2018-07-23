import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import styles from './Tasks.scss';
import icons from '../../assets/styles/linearicons.scss';

import Task from '../../components/lists/Task/Task';
import * as actions from '../../store/actions/';

class Tasks extends Component {
  
  onDeleteTask(id) {
    this.props.onDeleteTask(id);
  }

  onEditTask(id) {
    console.log('edit task id:', id);
  }

  onCompleteTask(task) {
    task.completed = true;
    const {id, ...taskData} = task;
    this.props.onEditTask(task.id, taskData);
  }

  render() {
    let tasks = null;
    if (this.props.tasks) {
      tasks = this.props.tasks.map(task => {
        return <Task 
          key={task.id} 
          title={task.title}
          priority={task.priority}
          completed={task.completed}
          completeTask={() => this.onCompleteTask(task)}
          deleteTask={() => this.onDeleteTask(task.id)}
          editTask={() => this.onEditTask(task.id)} />
      });
    }
    
    return (
      <div className={styles.taskBlock}>
        <h2 style={{color: this.props.color}}>{this.props.title}</h2>
        <button onClick={() => this.props.onShowAddForm(this.props.initDay)}>
          <span className={classNames(icons.lnr, icons["lnr-plus"])}></span>
        </button>
        <div className="tasks">
          {tasks}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onDeleteTask: (id) => dispatch(actions.deleteTask(id)),
    onEditTask: (id, data) => dispatch(actions.editTask(id, data)),
    onShowAddForm: (initDay) => dispatch(actions.showAddForm(initDay))
  }
}

export default connect(null, mapDispatchToProps)(Tasks);