import React, { Component } from 'react';
import { connect } from 'react-redux';
import FacebookLogin from './FacebookLogin';
import * as async from '../actions/async';
import * as postRequests from '../actions/postRequests';

class LoginPage extends Component {

  componentWillMount() {
    this.props.dispatch(async.purge('userError', 'appHasUserError'));
  }

  sendLoginInfo(e) {
    e.preventDefault();
    this.props.dispatch(postRequests.appLogin(
      { email: this.email.value, password: this.password.value }
    )).then(() => {
      if (this.props.currentUser) {
        this.props.history.push('/flights');
      }
    });
  }

  render() {
    return (
      <div className="app-content-outer-wrapper">
        <div className="app-content-container">
          <h2 className="app-content-header">Welcome Back!</h2>
          <FacebookLogin history={this.props.history} />
          <p className="email-option">or login with email</p>
          <form className="login-form" onSubmit={this.sendLoginInfo.bind(this)}>
            <input
              className="app-input"
              type="text"
              name="email"
              placeholder="Email"
              ref={element => {
                this.email = element;
                return this.email;
              }}
            />
            <input
              className="app-input"
              type="password"
              name="lastname"
              placeholder="Password"
              ref={element => {
                this.password = element;
                return this.password;
              }}
            />
            <input
              className="submit-button"
              type="submit"
              value="Login"
            />
          </form>
          <span className="user-error">
            {this.props.appHasUserError ? this.props.userError : null}
          </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  appHasUserError: state.appHasUserError,
  userError: state.userError
});

export default connect(mapStateToProps)(LoginPage);
