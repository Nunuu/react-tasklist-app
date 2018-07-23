import React from 'react';
import classNames from 'classnames';

import styles from './Task.scss';
import icons from '../../../assets/styles/linearicons.scss';

const task = (props) => {
  
  let priorityStyle = "";
  if (props.priority === 2) {
    priorityStyle = styles.high;
  } else if (props.priority === 0) {
    priorityStyle = styles.low;
  }

  return (
    <div className={classNames(styles.task, priorityStyle)}>
      <div className={classNames(styles.title, props.completed ? styles.completed : '')}>
        {props.title}
      </div>
      <div className={styles.buttons}>
        <button onClick={props.completeTask} disabled={props.completed}>
          <span className={classNames(icons.lnr, icons['lnr-file-check'])}></span>
        </button>
        <button onClick={props.editTask}>
          <span className={classNames(icons.lnr, icons['lnr-pencil5'])}></span>
        </button>
        <button onClick={props.deleteTask}>
          <span className={classNames(icons.lnr, icons['lnr-trash2'])}></span>
        </button>
      </div>
    </div>
  );
}

export default task;