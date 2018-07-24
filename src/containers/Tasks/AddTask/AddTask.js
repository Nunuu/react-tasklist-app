import React, {Component} from 'react';
import { connect } from 'react-redux';

import EditTaskForm from '../../Forms/Task/EditTaskForm';
import Modal from '../../../components/ui/Modal/Modal';
import Aux from '../../../hoc/reactAux/reactAux';
import * as actions from '../../../store/actions/';

class AddTask extends Component {
  
  submit = (values) => {
    this.props.onAddTask(values);
  }

  render() {
    let modal = null;
    if (this.props.showAddForm) {
      modal = <Modal 
        show={this.props.showAddForm} 
        modalClosed={this.props.onCloseForm} 
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
    showAddForm: state.tasks.showAdd
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCloseForm: () => dispatch(actions.hideAddForm()),
    onAddTask: (data) => dispatch(actions.addTask(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTask);