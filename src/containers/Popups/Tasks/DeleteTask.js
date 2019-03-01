import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import styles from '../Popups.scss';
import icons from '../../../assets/styles/linearicons.scss';

import Modal from '../../../components/ui/Modal/Modal';
import Aux from '../../../hoc/reactAux/reactAux';
import * as actions from '../../../store/actions/';
import Button from '../../../components/ui/Button/Button';

const deleteTask = props => {
  return (
    <Aux>
      <Modal
        show={props.showDeleteConfirm}
        modalClosed={props.onCancelDelete}
        extraStyle="warn">
        <div className={styles.question}>
          <span className={classNames(icons.lnr, icons['lnr-warning'])}></span>
          Are you sure you want to delete the following task?
          <p>{props.taskTitle}</p>
        </div>
        <div className={styles.buttons}>
          <Button 
            btnClass="confirm"
            clicked={() => props.onDeleteTask(props.taskId)}>
            <span className={classNames(icons.lnr, icons['lnr-check'])}></span>
            YES
          </Button>
          <Button 
            btnClass="cancel" 
            clicked={props.onCancelDelete}>
            <span className={classNames(icons.lnr, icons['lnr-cross2'])}></span>
            NO
          </Button>
        </div>
      </Modal>
    </Aux>
  );
}

const mapStateToProps = state => {
  return {
    showDeleteConfirm: state.tasks.showDelete,
    taskId: state.tasks.taskId,
    taskTitle: state.tasks.taskTitle
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCancelDelete: () => dispatch(actions.hideDeleteConfirm()),
    onDeleteTask: (id) => dispatch(actions.deleteTask(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(deleteTask);