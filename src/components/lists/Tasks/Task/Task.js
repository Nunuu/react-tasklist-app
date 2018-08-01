import React from 'react';
import classNames from 'classnames';
import moment from 'moment';
import PropTypes from 'prop-types';

import styles from './Task.scss';
import icons from '../../../../assets/styles/linearicons.scss';
import Button from '../../../ui/Button/Button';

const task = (props) => {
  
  const isComplete = props.completed === true;
  
  let completionDate = null;
  if (isComplete) {
    completionDate = <div className={styles.completion}>
      Completed on {moment(props.completionDate).format("MMMM DD YYYY [@] h:mm a")}
    </div>
  }

  return (
    <div className={classNames(styles.task, styles[props.priority])}>
      <div className={classNames(styles.title, isComplete ? styles.completed : '')}>
        {props.title}
      </div>
      {completionDate}
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

task.propTypes = {
  completed: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  priority: PropTypes.string.isRequired,
  completionDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date), PropTypes.object]),
  completeTask: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired
};

export default task;