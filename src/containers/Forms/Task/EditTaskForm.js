import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Flatpickr from 'react-flatpickr';

import Button from '../../../components/ui/Button/Button';
import styles from '../Forms.scss';

const required = value => (
  value || typeof value === 'number' ? undefined : 'The field is required.'
);
const minLength = min => value => (
  value && value.length < min ? `Must be ${min} characters or more.` : undefined
);
const minLength5 = minLength(5);

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched &&
        ((error && <p>{error}</p>) ||
          (warning && <p>{warning}</p>))}
    </div>
  </div>
);

let editTaskForm = props => {
  const { handleSubmit, pristine, submitting } = props;

  let completedField = null;
  let datePickerOptions = {
    altFormat: "F j, Y h:i K",
    altInput: true,
    dateFormat: "Y-m-d H:i"
  }

  if (props.formType !== "add") {
    completedField = <div className={styles.formRow}>
      <label>Completed</label>
      <div>
        <Field name="completed" component="select">
          <option value="true">True</option>
          <option value="false">False</option>
        </Field>
      </div>
    </div>
  } else {
    datePickerOptions.minDate = new Date(new Date().setHours(0, 0, 0, 0));
  }
  
  const renderDateTimePicker = ({ input: { onChange, value } }) => (
    <Flatpickr 
      data-enable-time
      onChange={onChange}
      value={!value ? null : new Date(value)}
      options={datePickerOptions} />
  );
  
  return (
    <form className={styles.form}>
      <div className={styles.formRow}>
        <Field 
          name="title" 
          type="text" 
          component={renderField} 
          label="Task Title"
          validate={[required, minLength5]} />
      </div>
      <div className={styles.formRow}>
        <label htmlFor="dueDate">Due Date</label>
        <Field 
          name="dueDate" 
          component={renderDateTimePicker} />
      </div>
      <div className={styles.formRow}>
        <label>Priority</label>
        <Field name="priority" component="select">
          <option value="low">Low</option>
          <option value="normal">Normal</option>
          <option value="high">High</option>
        </Field>
      </div>
      {completedField}
      <Button 
        btnClass="form" 
        type="submit"
        disabled={pristine || submitting}
        clicked={handleSubmit}>Submit</Button>
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