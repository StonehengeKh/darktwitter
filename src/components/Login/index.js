import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../actions/user";
import { Field, reduxForm } from "redux-form";
import { renderField, validate } from "../../utils/valid";
import "./style.css";

class Login extends Component {
  submit = values => {
    const { userLogin } = this.props;
    userLogin(values);
  };

  render() {
    return (
      <div className="wrap-login">
        <LoginForm onSubmit={this.submit} />
      </div>
    );
  }
}

let field = [
  {
    name: "login",
    type: "text",
    label: "Login"
  },
  {
    name: "password",
    type: "password",
    label: "Password"
  }
];

let LoginForm = props => {
  const { handleSubmit, submitting, pristine, reset } = props;
  return (
    <form onSubmit={handleSubmit}>
      {field.map((elem, index) => {
        const { name, type, label } = elem;
        return (
          <div key={index} className="login-form">
            <Field
              name={name}
              component={renderField}
              type={type}
              label={label}
            />
          </div>
        );
      })}
      <button type="submit" disabled={submitting} className="button">
        Login
      </button>
      <button
        type="button"
        disabled={pristine || submitting}
        onClick={reset}
        className="button"
      >
        Clear Values
      </button>
    </form>
  );
};

LoginForm = reduxForm({
  form: "Login",

})(LoginForm);

export default connect(
  null,
  actions
)(Login);
