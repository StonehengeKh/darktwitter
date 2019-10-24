import React, { Component } from "react";
import { connect } from "react-redux";
import { registration } from "../../actions/user";
import { Field, reduxForm } from "redux-form";
import { renderField, validate } from "../../utils/valid";
import "./style.css";

class Registration extends Component {
  submit = values => {
    const { registration } = this.props;
    registration(values);
  };

  render() {
    return (
      <div className="wrap-registr">
        <RegistrationForm onSubmit={this.submit} />
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

let RegistrationForm = props => {
  const { handleSubmit, submitting, pristine, reset } = props;
  return (
    <form onSubmit={handleSubmit}>
      {field.map((elem, index) => {
        const { name, type, label } = elem;
        return (
          <div key={index} className="registration-form">
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
        Registration
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

RegistrationForm = reduxForm({
  form: "Registration",
  validate
})(RegistrationForm);

export default connect(
  null,
  { registration }
)(Registration);
