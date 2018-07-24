import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import Button from '../../../components/ui/Button/Button';
import styles from '../Forms.scss';

const required = value => {
  return (value || typeof value === 'number' ? undefined : 'Required.');
}
const minLength = min => value => {
  return value && value.length < min ? `Must be ${min} characters or more.` : undefined;
}
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
)

let EditTaskForm = props => {
  const { handleSubmit, pristine, submitting } = props;

  let completedField = null;
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
  }

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
          component="input" 
          type="text" 
          validate={[required]} />
      </div>
      <div className={styles.formRow}>
        <label>Priority</label>
        <div>
          <Field name="priority" component="select">
            <option value="0">Low</option>
            <option value="1">Normal</option>
            <option value="2">High</option>
          </Field>
        </div>
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

EditTaskForm = reduxForm({
  form: 'edit-task'
})(EditTaskForm);

EditTaskForm = connect(
  state => ({
    initialValues: state.tasks.taskData
  })
)(EditTaskForm);

export default EditTaskForm;