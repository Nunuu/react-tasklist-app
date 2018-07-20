import React from 'react';
import classNames from 'classnames';

import styles from './Task.scss';
import icons from '../../../../assets/styles/linearicons.scss';

const task = (props) => {
  
  let priorityStyle = "";
  if (props.priority === 2) {
    priorityStyle = styles.high;
  } else if (props.priority === 0) {
    priorityStyle = styles.low;
  }

  return (
    <div className={classNames(styles.task, priorityStyle)}>
      <div className={styles.title}>
        {props.title}
      </div>
      <div className={styles.buttons}>
        <button>
          <span className={classNames(icons.lnr, icons['lnr-pencil5'])}></span>
        </button>
        <button>
          <span className={classNames(icons.lnr, icons['lnr-trash2'])}></span>
        </button>
      </div>
    </div>
  );
}

export default task;