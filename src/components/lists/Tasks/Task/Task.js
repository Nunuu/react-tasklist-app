import React from 'react';
import classNames from 'classnames';

import styles from './Task.scss';

const task = (props) => {
  
  let priorityStyle = "";
  if (props.priority === 2) {
    priorityStyle = styles.high;
  } else if (props.priority === 0) {
    priorityStyle = styles.low;
  }

  return (
    <div className={classNames(styles.task, priorityStyle)}>
      {props.title}
    </div>
  );
}

export default task;