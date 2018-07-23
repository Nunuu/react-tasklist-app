import React, {Component} from 'react';
import { connect } from 'react-redux';

import Modal from '../../../components/ui/Modal/Modal';
import { updateObject, checkValidity } from '../../../shared/helpers';
import Input from '../../../components/ui/Input/Input';
import * as actions from '../../../store/actions/';
import Aux from '../../../hoc/reactAux/reactAux';
import Button from '../../../components/ui/Button/Button';

class AddTask extends Component {
  
  state = {
    fields: {
      title: {
        type: 'input',
        config: {
          type: 'text',
          placeholder: 'Task Title'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        valueType: 'Task Title'
      },
      dueDate: {
        type: 'date',
        config: {
          type: 'text',
          placeholder: 'Due Date'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        valueType: 'Due Date'
      },
      priority: {
        type: 'select',
        config: {
          options: [
            {value: 0, label: 'Low'},
            {value: 1, label: 'Normal'},
            {value: 2, label: 'High'}
          ]
        },
        value: 1,
        validation: {},
        valid: true
      }
    },
    isValid: false
  }

  inputChangedHandler = (e, inputIdentifier) => {
    const updatedFormElement = updateObject(this.state.fields[inputIdentifier], {
      value: e.target.value,
      valid: checkValidity(e.target.value, this.state.fields[inputIdentifier].validation),
      touched: true
    });
    const updatedForm = updateObject(this.state.fields, {
      [inputIdentifier]: updatedFormElement
    })
    
    let formIsValid = true;
    for (let inputIdentifier in updatedForm) {
      formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({fields: updatedForm, isValid: formIsValid});
  }

  addTaskHandler = (e) => {
    e.preventDefault();

    const title = this.state.fields.title.value;
    const priority = +this.state.fields.priority.value;
    const dueDate = new Date();
    this.props.onAddTask(title, priority, dueDate);
  }

  render() {
    let modal = null;
    if (this.props.showAddForm) {
      const formFields = [];
      for (let key in this.state.fields) {
        formFields.push({
          id: key,
          config: this.state.fields[key]
        });
      }

      modal = <Modal 
        show={this.props.showAddForm} 
        modalClosed={this.props.onCloseForm} 
        title="Add Task" >
        <form>
          {formFields.map(field => {
            return <Input 
              key={field.id}
              elementType={field.config.type} 
              elementConfig={field.config.config} 
              value={field.config.value}
              invalid={!field.config.valid}
              shouldValidate={field.config.validation}
              touched={field.config.touched}
              valueType={field.config.valueType}
              changed={(e) => this.inputChangedHandler(e, field.id)} />
            })}
          <Button 
            btnClass="form" 
            type="submit"
            disabled={!this.state.isValid}
            clicked={(e) => this.addTaskHandler(e)}>ADD TASK</Button>
          <div>{this.props.taskUpdateError}</div>
        </form>
      </Modal>
    }

    return (
      <Aux>
        {modal}
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
    showAddForm: state.forms.showAdd,
    initDay: state.forms.initDay,
    initProject: state.forms.initProject,
    taskUpdateError: state.tasks.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCloseForm: () => dispatch(actions.hideAddForm()),
    onAddTask: (title, priority, dueDate) => dispatch(actions.addTask(title, priority, dueDate))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTask);