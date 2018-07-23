import React, {Component} from 'react';

import classes from "./Modal.scss";
import Aux from '../../../hoc/reactAux/reactAux';
import Backdrop from '../Backdrop/Backdrop';

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
          className={classes.Modal}
          style={{
            transform: this.props.show ? 'translateY(-50%, -55%)' : 'translateY(-100vh)',
            opacity: this.props.show ? 1 : 0
          }}>
          {title}
          {this.props.children}
        </div>
      </Aux>
    )
  }
}

export default Modal;