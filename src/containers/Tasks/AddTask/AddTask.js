import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';

import EditTaskForm from '../../Forms/Task/EditTaskForm';
import Modal from '../../../components/ui/Modal/Modal';
import Aux from '../../../hoc/reactAux/reactAux';
import * as actions from '../../../store/actions/';

class AddTask extends Component {
  
  submit = (values) => {
    this.props.onAddTask(values);
  }

  onModalClose = () => {
    this.props.onCloseForm(this.props.formValues);
  }

  render() {
    let modal = null;
    if (this.props.showAddForm) {
      modal = <Modal 
        show={this.props.showAddForm} 
        modalClosed={this.onModalClose} 
        title="Add Task" >
        <EditTaskForm onSubmit={this.submit} formType="add" />
      </Modal>
    }
    return (
      <Aux>
        {modal}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    showAddForm: state.tasks.showAdd,
    formValues: getFormValues('edit-task')(state),
    count: state.tasks.count
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCloseForm: (data) => dispatch(actions.hideAddForm(data)),
    onAddTask: (data) => dispatch(actions.addTask(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTask);