import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';

import styles from './TopBar.scss';
import avatarImage from '../../../assets/images/avatar.jpg';
import icons from '../../../assets/styles/linearicons.scss';
import * as actions from '../../../store/actions/';
import Button from '../../ui/Button/Button';
import stickyComponent from '../../../hoc/stickyComponent/stickyComponent';

const topBar = props => {
  return (
    <header className={classNames(styles.topbar, props.shrinkHeader ? styles.small : '')}>
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
        <Button btnClass="plain">
          <span className={classNames(icons.lnr, icons["lnr-magnifier"])}></span>
        </Button>
        <Button btnClass="plain" clicked={props.onShowAddForm}>
          <span className={classNames(icons.lnr, icons["lnr-plus"])}></span>
        </Button>
      </div>
    </header>
  );
}

const mapStateToProps = state => {
  return {
    numTasks: state.tasks.count,
    showAddForm: state.tasks.showAdd
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onShowAddForm: () => dispatch(actions.showAddForm())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(stickyComponent(topBar));