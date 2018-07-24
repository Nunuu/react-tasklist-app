import React from 'react';
import classNames from 'classnames';

import styles from './Task.scss';
import icons from '../../../assets/styles/linearicons.scss';

const task = (props) => {
  
  const isComplete = String(props.completed) === 'true';

  return (
    <div className={classNames(styles.task, styles[props.priority])}>
      <div className={classNames(styles.title, isComplete ? styles.completed : '')}>
        {props.title}
      </div>
      <div className={styles.buttons}>
        <button onClick={props.completeTask} disabled={isComplete}>
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