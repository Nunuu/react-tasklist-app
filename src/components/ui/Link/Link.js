import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import styles from './Link.scss';
import icons from '../../../assets/styles/linearicons.scss';

const link = (props) => {
  return (
    <NavLink 
      to={props.link} 
      exact={props.exact}
      className={styles.link} 
      activeClassName={styles.active}>
      <span className={classNames(styles.icon, icons.lnr, icons[props.icon])}></span>
      {props.children}
    </NavLink>
  );
}

export default link;