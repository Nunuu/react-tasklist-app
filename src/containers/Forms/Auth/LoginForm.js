import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import styles from '../Forms.scss';

import Button from '../../../components/ui/Button/Button';
import { required, validateEmail } from '../../../shared/helpers';

let loginForm = props => {
  
  const { handleSubmit, pristine, submitting } = props;

  let errorMessage = null;
  if (props.error) {
    errorMessage = <p>{props.error}</p>
  }

  return (
    <form className={styles.authForm}>
      <div className={styles.formRow}>
        <label htmlFor="email">Email</label>
        <Field 
          name="email" 
          component="input" 
          type="email"
          validate={[required, validateEmail]} />
      </div>
      <div className={styles.formRow}>
        <label htmlFor="password">Password</label>
        <Field 
          name="password" 
          component="input" 
          type="password"
          validate={required} />
      </div>
      {errorMessage}
      <Button 
        btnClass="form" 
        type="submit"
        disabled={pristine || submitting}
        clicked={handleSubmit}>
        Login
      </Button>
    </form>
  );
};

const mapStateToProps = state => {
  return {
    error: state.auth.error
  }
}

loginForm = reduxForm({
  form: 'login'
})(loginForm);

export default connect(mapStateToProps)(loginForm);