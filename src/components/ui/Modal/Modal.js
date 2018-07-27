import React from 'react';
import classNames from 'classnames';
import Transition from 'react-transition-group/Transition';

import styles from "./Modal.scss";
import icons from '../../../assets/styles/linearicons.scss';

import Aux from '../../../hoc/reactAux/reactAux';
import Backdrop from '../Backdrop/Backdrop';
import Button from '../Button/Button';

const modal = props => (
  <Transition 
    in={props.show} 
    timeout={300} 
    mountOnEnter 
    unmountOnExit>
    {state => (
      <Aux>
        <Backdrop show={state} clicked={props.modalClosed} />
        <div className={classNames(
          styles.modal, 
          state === 'entered' ? styles.entered : ''
        )}>
          {props.title ? <h2>{props.title}</h2> : null}
          {props.children}
          <Button btnClass="close" clicked={props.modalClosed}>
            <span className={classNames(icons.lnr, icons['lnr-cross2'])}></span>
          </Button>
        </div>
      </Aux>
    )}
  </Transition>
);

export default modal;