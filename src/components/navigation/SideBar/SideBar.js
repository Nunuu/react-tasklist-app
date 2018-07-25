import React from 'react';
import classNames from 'classnames';

import styles from './SideBar.scss';

import Link from '../../ui/Link/Link';
import stickyComponent from '../../../hoc/stickyComponent/stickyComponent';

const sideBar = props => {
  return (
    <aside className={classNames(styles.sidebar, props.shrinkHeader ? styles.high : '')}>
      <div className={styles.heading}>Sort</div>
      <Link link="/" icon="lnr-alarm2" exact>Days</Link>
      <Link link="/projects" icon="lnr-document">Projects</Link>
      <Link link="/completed" icon="lnr-file-check">Completed</Link>
      <div className={styles.heading}>Other</div>
      <Link link="/analytics" icon="lnr-chart-bars">Analytics</Link>
      <Link link="/settings" icon="lnr-cog">Settings</Link>
    </aside>
  );
}

export default stickyComponent(sideBar);