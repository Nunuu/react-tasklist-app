import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Flatpickr from 'react-flatpickr';
import classNames from 'classnames';

import styles from '../Forms.scss';
import icons from '../../../assets/styles/linearicons.scss';

import Dropdown from '../../../components/ui/Dropdown/Dropdown';
import Button from '../../../components/ui/Button/Button';
import { renderField, required, minLength5 } from '../../../shared/helpers';

const renderDateTimePicker = ({ input: { onChange, value }, formType }) => (
  <Flatpickr 
    onChange={onChange}
    value={!value ? null : new Date(value)}
    options={{
      altFormat: "F j, Y",
      altInput: true,
      dateFormat: "Y-m-d",
      minDate: formType === "add" ? new Date(new Date().setHours(0, 0, 0, 0)) : null
    }} />
);

const renderDropdown = ({ input: {onChange, value} }) => {
  const options = [
    {value: 'low', label: 'Low'},
    {value: 'normal', label: 'Normal'},
    {value: 'high', label: 'High'}
  ]
  return <Dropdown 
    options={options} 
    onChange={(option) => onChange(option.value)} 
    value={value ? value : ''} 
    placeholder="Priority"
    placeholderClassName={styles.dropdownPlaceholder}
    arrowClassName={icons.lnr} />
};

let editTaskForm = props => {
  
  const { handleSubmit, pristine, submitting } = props;

  let completedField = null;
  if (props.formType !== "add") {
    completedField = <div className={classNames(styles.formRow, styles.centered)}>
      <Field name="completed" component="input" type="checkbox" id="completed" />
      <label className={styles.checkboxLabel} htmlFor="completed">Completed</label>
    </div>
  }
  
  return (
    <form>
      <div className={styles.formRow}>
        <Field 
          id="title"
          name="title" 
          type="textarea" 
          component={renderField} 
          label="Task Title"
          validate={[required, minLength5]}
          autoFocus={props.formType === 'add'} />
      </div>
      <div className={styles.formRow}>
        <label htmlFor="dueDate">Due Date</label>
        <Field 
          id="dueDate"
          name="dueDate" 
          component={renderDateTimePicker}
          formType={props.formType} />
      </div>
      <div className={styles.formRow}>
        <label htmlFor="priority">Priority</label>
        <Field 
          id="priority"
          name="priority" 
          component={renderDropdown} />
      </div>
      {completedField}
      <Button 
        btnClass="form" 
        type="submit"
        disabled={pristine || submitting}
        clicked={handleSubmit}>
        <span>{props.formType}</span> Task
      </Button>
    </form>
  );
}

const mapStateToProps = state => {
  return {
    initialValues: state.tasks.showAdd ? state.tasks.newTaskData : state.tasks.taskData
  }
}

editTaskForm = reduxForm({
  form: 'edit-task'
})(editTaskForm);

export default connect(mapStateToProps)(editTaskForm);