import React from 'react';
import classNames from 'classnames';

import styles from './Task.scss';
import icons from '../../../../assets/styles/linearicons.scss';
import Button from '../../../ui/Button/Button';

const task = (props) => {
  
  const isComplete = String(props.completed) === 'true';

  return (
    <div className={classNames(styles.task, styles[props.priority])}>
      <div className={classNames(styles.title, isComplete ? styles.completed : '')}>
        {props.title}
      </div>
      <div className={styles.buttons}>
        <Button clicked={props.completeTask} disabled={isComplete}>
          <span className={classNames(icons.lnr, icons['lnr-file-check'])}></span>
        </Button>
        <Button clicked={props.editTask}>
          <span className={classNames(icons.lnr, icons['lnr-pencil5'])}></span>
        </Button>
        <Button clicked={props.deleteTask}>
          <span className={classNames(icons.lnr, icons['lnr-trash2'])}></span>
        </Button>
      </div>
    </div>
  );
}

export default task;