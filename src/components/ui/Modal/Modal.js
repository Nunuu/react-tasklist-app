import React, {Component} from 'react';
import classNames from 'classnames';

import styles from "./Modal.scss";
import icons from '../../../assets/styles/linearicons.scss';

import Aux from '../../../hoc/reactAux/reactAux';
import Backdrop from '../Backdrop/Backdrop';
import Button from '../Button/Button';

class Modal extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  }

  render() {
    let title = null;
    if (this.props.title) {
      title = <h2>{this.props.title}</h2>;
    }
    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div 
          className={styles.modal}
          style={{
            transform: this.props.show ? 'translateY(-50%, -55%)' : 'translateY(-100vh)',
            opacity: this.props.show ? 1 : 0
          }}>
          {title}
          {this.props.children}
          <Button btnClass="close" clicked={this.props.modalClosed}>
            <span className={classNames(icons.lnr, icons['lnr-cross2'])}></span>
          </Button>
        </div>
      </Aux>
    )
  }
}

export default Modal;