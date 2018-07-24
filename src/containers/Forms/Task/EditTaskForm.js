import React from 'react';
import { Field, reduxForm } from 'redux-form';

import Button from '../../../components/ui/Button/Button';
import styles from '../Forms.scss';

const validate = values => {
  const errors = {};
  if (!values.title) {
    errors.title = 'Required';
  } else if (values.title.length < 5) {
    errors.title = 'Must be 5 characters or more';
  }
  return errors;
}

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <input {...input} placeholder={label} type={type}/>
    {touched && ((error && <p>{error}</p>) || (warning && <p>{warning}</p>))}
  </div>
)

const EditTaskForm = (props) => {
  const { handleSubmit, pristine, submitting } = props;
  return (
    <form className={styles.form}>
      <div className={styles.formRow}>
        <Field name="title" type="text" component={renderField} label="Task Title"/>
      </div>
      <div className={styles.formRow}>
        <label htmlFor="dueDate">Due Date</label>
        <Field name="dueDate" component="input" type="text"/>
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
      <Button 
        btnClass="form" 
        type="submit"
        disabled={pristine || submitting}
        clicked={handleSubmit}>EDIT TASK</Button>
    </form>
  );
}

export default reduxForm({
  form: 'edit-task',
  initialValues: {priority: "1"},
  validate
})(EditTaskForm);