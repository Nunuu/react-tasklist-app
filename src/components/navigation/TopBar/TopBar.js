import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';

import styles from './TopBar.scss';
import avatarImage from '../../../assets/images/avatar.jpg';
import guestAvatarImage from '../../../assets/images/avatar_guest.jpg';
import icons from '../../../assets/styles/linearicons.scss';

import * as actions from '../../../store/actions/';
import Button from '../../ui/Button/Button';
import stickyComponent from '../../../hoc/stickyComponent/stickyComponent';
import Aux from '../../../hoc/reactAux/reactAux';

const topBar = props => {

  let userNav = <div className={styles.user}>
      <img src={guestAvatarImage} alt="User Avatar" />
      <div>
        <span className={styles.username}>Guest</span>
      </div>
    </div>
  
  if (props.isLoggedIn) {
    userNav = <Aux>
      <div className={styles.user}>
        <img src={avatarImage} alt="User Avatar" />
        <div>
          <span className={styles.username}>{props.username}</span>
          <span className={styles.usercount}>
            {props.numTasks} {props.numTasks === 1 ? "Task" : "Tasks"}
          </span>
        </div>
      </div>
      <div className={styles.controls}>
        <Button btnClass="plain" title="Search" disabled>
          <span className={classNames(icons.lnr, icons["lnr-magnifier"])}></span>
        </Button>
        <Button btnClass="plain" clicked={props.onShowAddForm} title="Add Task">
          <span className={classNames(icons.lnr, icons["lnr-plus"])}></span>
        </Button>
        <Button btnClass="plain" clicked={props.onLogout} title="Logout">
          <span className={classNames(icons.lnr, icons["lnr-exit"])}></span>
        </Button>
      </div>
    </Aux>
  };

  const headerClasses = classNames(
    styles.topbar, 
    props.shrinkHeader ? styles.small : '',
    props.isLoggedIn ? '' : styles.guest
  )

  return (
    <header className={headerClasses}>
      {userNav}
    </header>
  );
}

const mapStateToProps = state => {
  return {
    numTasks: state.tasks.count,
    showAddForm: state.tasks.showAdd,
    username: state.auth.username
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onShowAddForm: () => dispatch(actions.showAddForm()),
    onLogout: () => dispatch(actions.logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(stickyComponent(topBar));