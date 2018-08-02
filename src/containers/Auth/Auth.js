import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './Auth.scss';

import * as actions from '../../store/actions/';
import AuthForm from '../Forms/Auth/AuthForm';

class Auth extends Component {
  
  submit = values => {
    this.props.onLogin(values);
  }

  render() {
    return (
      <div className={styles.auth}>
        <h1>Please login to use the tool.</h1>
        <AuthForm onSubmit={this.submit} />
        <p>Users without an account can log in using <strong>test@test.com</strong> and password <strong>testing</strong></p>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (values) => dispatch(actions.authUser(values))
  }
}

export default connect(null, mapDispatchToProps)(Auth);