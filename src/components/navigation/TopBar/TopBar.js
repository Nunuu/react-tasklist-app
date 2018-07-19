import React from 'react';
import classNames from 'classnames';

import styles from './TopBar.scss';
import avatarImage from '../../../assets/images/avatar.jpg';
import icons from '../../../assets/styles/linearicons.scss';

const topBar = (props) => {
  return (
    <header className={styles.topbar}>
      <div className={styles.user}>
        <img src={avatarImage} alt="User Avatar" />
        <div>
          <span className={styles.username}>User Name</span>
          <span className={styles.usercount}>
            {props.numTasks} {props.numTasks === 1 ? "Task" : "Tasks"}
          </span>
        </div>
      </div>
      <div className={styles.controls}>
        <button type="button">
          <span className={classNames(icons.lnr, icons["lnr-magnifier"])}></span>
        </button>
        <button type="button" onClick={props.addTask}>
          <span className={classNames(icons.lnr, icons["lnr-plus"])}></span>
        </button>
      </div>
    </header>
  );
}

export default topBar;