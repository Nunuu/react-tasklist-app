import React from 'react';
import className from 'classnames';

import styles from './Button.scss';

const button = (props) => {
  return (
    <button 
      className={className(styles.button, styles[props.btnClass])}
      type={props.type ? props.type : "button"}
      onClick={props.clicked}
      disabled={props.disabled}>
      {props.children}
    </button>
  )
};

export default button;