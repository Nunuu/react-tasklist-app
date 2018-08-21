import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';

import EditProjectForm from '../../Forms/Project/EditProjectForm';
import Modal from '../../../components/ui/Modal/Modal';
import Aux from '../../../hoc/reactAux/reactAux';
import * as actions from '../../../store/actions/';

class AddProject extends Component {
  
  submit = (values) => {
    this.props.onAddProject(values);
  }

  onModalClose = () => {
    this.props.onCloseForm(this.props.formValues);
  }

  render() {
    return (
      <Aux>
        <Modal 
          show={this.props.showAddForm}
          modalClosed={this.props.onCloseForm} 
          title="Add Project">
          <EditProjectForm onSubmit={this.submit} formType="add" />
        </Modal>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    showAddForm: state.projects.showAdd,
    formValues: getFormValues('edit-project')(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCloseForm: (data) => dispatch(actions.hideProjectAddForm(data)),
    onAddProject: (data) => dispatch(actions.addProject(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProject);