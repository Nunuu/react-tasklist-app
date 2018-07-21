import React from 'react';
import classNames from 'classnames';

import styles from './Popup.scss';
import icons from '../../../assets/styles/linearicons.scss';

import Aux from '../../../hoc/reactAux/reactAux';

const popup = (props) => {
  return (
    <Aux>
      <div className={styles.popup} onClick={props.cancel}></div>
      <div className={styles.wrapper}>
        <div className={styles.question}>
          {props.text}
        </div>
        <div className={styles.buttons}>
          <button className={styles.yes} onClick={props.proceed}>
            <span className={classNames(icons.lnr, icons['lnr-check'])}></span>
            YES
          </button>
          <button className={styles.no} onClick={props.cancel}>
            <span className={classNames(icons.lnr, icons['lnr-cross2'])}></span>
            NO
          </button>
        </div>
      </div>
    </Aux>
  );
}

export default popup;