import React from 'react';
import className from 'classnames';

import styles from './Button.scss';

const button = (props) => {

  const btnClasses = className(
    styles.button, 
    styles[props.btnClass],
    props.isHidden ? styles.hidden : '',
    props.hoverClass ? styles[props.hoverClass] : ''
  );

  return (
    <button 
      className={btnClasses}
      type={props.type ? props.type : "button"}
      onClick={props.clicked}
      disabled={props.disabled}
      title={props.title}>
      {props.children}
    </button>
  )
};

export default button;