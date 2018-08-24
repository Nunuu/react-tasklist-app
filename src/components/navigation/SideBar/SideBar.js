import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import styles from './SideBar.scss';
import icons from '../../../assets/styles/linearicons.scss';

import * as actions from '../../../store/actions/';
import Link from '../../ui/Link/Link';
import stickyComponent from '../../../hoc/stickyComponent/stickyComponent';
import Button from '../../ui/Button/Button';

const sideBar = props => {

  let logoutButton = null;
  if (props.isLoggedIn) {
    logoutButton = <Button btnClass="sidebar" clicked={props.onLogout} title="Logout">
      <span className={classNames(icons.lnr, icons["lnr-exit"])}></span>
      Logout
    </Button>
  }

  return (
    <aside className={classNames(styles.sidebar, props.shrinkHeader ? styles.high : '')}>
      <div className={styles.heading}>View</div>
      <Link link="/" icon="lnr-alarm2" exact>Days</Link>
      <Link link="/projects" icon="lnr-document">Projects</Link>
      <Link link="/completed" icon="lnr-file-stats">Status</Link>
      <div className={styles.heading}>Other</div>
      <Link link="/analytics" icon="lnr-chart-bars">Analytics</Link>
      <Link link="/settings" icon="lnr-cog">Settings</Link>
      {logoutButton}
    </aside>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.logout())
  }
}

export default withRouter(connect(null, mapDispatchToProps)(stickyComponent(sideBar)));