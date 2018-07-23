import React, { Component } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';

import styles from './TopBar.scss';
import avatarImage from '../../assets/images/avatar.jpg';
import icons from '../../assets/styles/linearicons.scss';
import * as actions from '../../store/actions/';
import Button from '../../components/ui/Button/Button';

class TopBar extends Component {
  render() {
    return (
      <header className={classNames(styles.topbar, this.props.shrinkHeader ? styles.small : '')}>
        <div className={styles.user}>
          <img src={avatarImage} alt="User Avatar" />
          <div>
            <span className={styles.username}>User Name</span>
            <span className={styles.usercount}>
              {this.props.numTasks} {this.props.numTasks === 1 ? "Task" : "Tasks"}
            </span>
          </div>
        </div>
        <div className={styles.controls}>
          <Button btnClass="plain">
            <span className={classNames(icons.lnr, icons["lnr-magnifier"])}></span>
          </Button>
          <Button btnClass="plain" clicked={this.props.onShowAddForm}>
            <span className={classNames(icons.lnr, icons["lnr-plus"])}></span>
          </Button>
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => {
  return {
    numTasks: state.tasks.count,
    showAddForm: state.forms.showAdd
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onShowAddForm: () => dispatch(actions.showAddForm())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);