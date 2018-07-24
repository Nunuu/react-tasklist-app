import React, {Component} from 'react';
import { connect } from 'react-redux';

import EditTaskForm from '../../Forms/Task/EditTaskForm';
import Modal from '../../../components/ui/Modal/Modal';
import Aux from '../../../hoc/reactAux/reactAux';
import * as actions from '../../../store/actions/';

class EditTask extends Component {
  
  submit = (values) => {
    console.log(this.props.taskId);
    console.log(values);
  }

  render() {
    let modal = null;
    if (this.props.showEditForm) {
      modal = <Modal 
        show={this.props.showEditForm} 
        modalClosed={this.props.onCloseForm} 
        title="Edit Task" >
        <EditTaskForm onSubmit={this.submit} />
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
    showEditForm: state.tasks.showEdit,
    taskId: state.tasks.taskId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCloseForm: () => dispatch(actions.hideEditForm()),
    onEditTask: () => dispatch(actions.editTask())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTask);