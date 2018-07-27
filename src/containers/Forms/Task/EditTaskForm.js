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
  meta: { touched, error, warning },
  formType
}) => {
  let inputField = <input 
    {...input} 
    placeholder={label} 
    type={type} />;
  if (type === "textarea") {
    inputField = <textarea 
      {...input} 
      placeholder={label}
      autoFocus={formType === 'add'} />
  }
  return (
    <div>
      <label>{label}</label>
      {inputField}
      {touched &&
        ((error && <p>{error}</p>) ||
          (warning && <p>{warning}</p>))}
    </div>
  )
};

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

let editTaskForm = props => {
  
  const { handleSubmit, pristine, submitting } = props;

  let completedField = null;
  if (props.formType !== "add") {
    completedField = <div className={styles.formRow}>
      <label>Completed</label>
      <Field name="completed" component="select">
        <option value="true">True</option>
        <option value="false">False</option>
      </Field>
    </div>
  }
  
  return (
    <form className={styles.form}>
      <div className={styles.formRow}>
        <Field 
          name="title" 
          type="textarea" 
          component={renderField} 
          label="Task Title"
          validate={[required, minLength5]}
          formType={props.formType} />
      </div>
      <div className={styles.formRow}>
        <label htmlFor="dueDate">Due Date</label>
        <Field 
          name="dueDate" 
          component={renderDateTimePicker}
          formType={props.formType} />
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