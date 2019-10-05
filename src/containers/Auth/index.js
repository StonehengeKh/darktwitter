import React, { Component } from "react";
import Login from "../../components/Login";
import Regisration from "../../components/Registration";
import { connect } from "react-redux";
import * as actions from "../../actions/user";
import { Redirect, Route } from "react-router-dom";
import "./style.css";

export class Auth extends Component {
  state = { login: true };

  toggleAuthProperty = () =>
    this.setState(prevState => ({ ...prevState, login: !prevState.login }));

  render() {
    const { isFetching, incorected, mailExists, user } = this.props;
    const { login } = this.state;
    return (
      <div>
        <div className="wrap">
          {isFetching && <p>Loading...</p>}
          {login ? (
            <button onClick={this.toggleAuthProperty} className="button">
              Registration
            </button>
          ) : (
            <button onClick={this.toggleAuthProperty} className="button">
              Login
            </button>
          )}
          {login ? <Login /> : <Regisration />}
        </div>
        {incorected && (
          <p className="error text_response">Incorected login/password</p>
        )}
        {mailExists && (
          <p className="error text_response">Email already exists</p>
        )}
        {user ? <p>{user.login}</p> : null}
        <Route render={() => (user ? <Redirect to="/" /> : null)} />
      </div>
    );
  }
}
const mapStateToProps = ({userReduser}) => {
  return {
    user: userReduser.user,
    isFetching: userReduser.isFetching,
    incorected: userReduser.incorected,
    mailExists: userReduser.mailExists
  };
};

export default connect(
  mapStateToProps,
  actions
)(Auth);
