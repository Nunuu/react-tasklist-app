import React from 'react';
import classNames from 'classnames';

import styles from './Backdrop.scss';

const backdrop = (props) => (
  <div 
    className={classNames(
      styles.backdrop, 
      props.show === 'entered' ? styles.entered : ''
    )}
    onClick={props.clicked}></div>
);

export default backdrop;