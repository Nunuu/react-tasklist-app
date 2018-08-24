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

  let status = null;
  if (props.dueDate) {
    status = <div className={styles.status}>
      <span className={classNames(icons.lnr, icons['lnr-clock'])}></span>
      {moment(props.dueDate[0]).format("MMM DD, YY")}
    </div>
  } else if (props.project) {
    status = <div className={styles.status}>
      <span className={classNames(icons.lnr, icons['lnr-document'])}></span>
      {props.project}
    </div>
  }

  return (
    <div className={classNames(styles.task, styles[props.priority])}>
      <div className={classNames(styles.title, isComplete ? styles.completed : '')}>
        {props.title}
      </div>
      {completionDate}
      <div className={status ? styles.bottom : styles.bottomRight}>
        {status}
        <div className={styles.buttons}>
          <Button 
            clicked={props.completeTask} 
            isHidden={isComplete} 
            title="Complete">
            <span className={classNames(icons.lnr, icons['lnr-calendar-check'])}></span>
          </Button>
          <Button 
            clicked={props.unCompleteTask} 
            isHidden={!isComplete} 
            title="Incomplete">
            <span className={classNames(icons.lnr, icons['lnr-calendar-cross'])}></span>
          </Button>
          <Button clicked={props.editTask} title="Edit">
            <span className={classNames(icons.lnr, icons['lnr-pencil5'])}></span>
          </Button>
          <Button clicked={props.deleteTask} title="Delete">
            <span className={classNames(icons.lnr, icons['lnr-trash2'])}></span>
          </Button>
        </div>
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
  unCompleteTask: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired
};

export default task;