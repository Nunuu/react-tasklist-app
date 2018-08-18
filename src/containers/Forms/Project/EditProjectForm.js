import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import styles from '../Forms.scss';

let editProjectForm = props => {
  return (
    <form>
      <div className={styles.formRow}>
        <Field 
          id="title"
          name="title" 
          type="textarea" 
          component={renderField} 
          label="Project Title"
          validate={[required, minLength5]}
          autoFocus={props.formType === 'add'} />
      </div>
      <Button 
        btnClass="form" 
        type="submit"
        disabled={pristine || submitting}
        clicked={handleSubmit}>
        <span>{props.formType}</span> Task
      </Button>
    </form>
  )
};

const mapStateToProps = state => {
  return {
    initialValues: state.projects.showAdd ? state.projects.newProjectData : state.projects.projectData
  }
}

editProjectForm = reduxForm({
  form: 'edit-project'
})(editProjectForm);

export default connect(mapStateToProps)(editProjectForm);