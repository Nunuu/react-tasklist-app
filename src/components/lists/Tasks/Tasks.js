import React from 'react';
import classNames from 'classnames';

import styles from './Tasks.scss';
import icons from '../../../assets/styles/linearicons.scss';

import Task from './Task/Task';

const tasks = (props) => {
  let tasks = null;
  if (props.tasks) {
    tasks = props.tasks.map(task => {
      return <Task 
        key={task.id} 
        title={task.title}
        priority={task.priority} />
    });
  }
  
  return (
    <div className={styles.taskBlock}>
      <h2 style={{color: props.color}}>{props.title}</h2>
      <button>
        <span className={classNames(icons.lnr, icons["lnr-plus"])}></span>
      </button>
      <div className="tasks">
        {tasks}
      </div>
    </div>
  );
}

export default tasks;