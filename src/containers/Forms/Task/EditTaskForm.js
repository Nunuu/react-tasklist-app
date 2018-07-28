import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Flatpickr from 'react-flatpickr';
import Dropdown from '../../../components/ui/Dropdown/Dropdown';

import styles from '../Forms.scss';
import icons from '../../../assets/styles/linearicons.scss';

import Button from '../../../components/ui/Button/Button';

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
    completedField = <div className={styles.formRow}>
      <label className={styles.checkboxLabel}>
        <Field name="completed" component="input" type="checkbox" />
        Completed
      </label>
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
        <Field 
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