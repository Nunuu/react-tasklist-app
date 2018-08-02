import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import styles from '../Forms.scss';

import Button from '../../../components/ui/Button/Button';
import { renderField, required, validateEmail } from '../../../shared/helpers';
import Loader from '../../../components/ui/Loader/Loader';

let authForm = props => {
  
  const { handleSubmit, pristine, submitting } = props;
  
  let authRedirect = null;
  if (props.isLoggedIn) {
    authRedirect = <Redirect to="/" />
  }

  let errorMessage = null;
  if (props.errorMessage) {
    errorMessage = <p className={styles.formError}>
      {props.errorMessage}
    </p>
  }

  let loader = null;
  if (props.loading) {
    loader = <Loader />
  }

  return (
    <form className={styles.authForm}>
      {authRedirect}
      <div className={styles.formRow}>
        <Field 
          id="email"
          name="email" 
          component={renderField} 
          type="email"
          validate={[required, validateEmail]}
          label="Email"
          autoFocus />
      </div>
      <div className={styles.formRow}>
        <Field
          id="password" 
          name="password" 
          component={renderField} 
          type="password"
          label="Password"
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
      {loader}
    </form>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    errorMessage: state.auth.error,
    isLoggedIn: state.auth.token !== null
  }
}

authForm = reduxForm({
  form: 'login'
})(authForm);

export default connect(mapStateToProps)(authForm);