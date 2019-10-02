import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/user";
import { Field, reduxForm } from 'redux-form'
import {renderField,  validate} from '../../utils/valid'


class Registration extends Component {

	// sendRequest = () => {
	// 	const { registration } = this.props;
	// 	const values = Object.keys(this.state.form).reduce((prev, elem) => {
	// 		return { ...prev, [elem]: this.state.form[elem].value };
	// 	}, {});
	// 	values.email.toLowerCase()
	// 	values.role = "user"
	// 	registration(values)
	// 	console.log("values", values);
	// 	this.clearInput();
	// };

	submit = values => console.log(values)
	
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
		name: "nick",
		type:"text",
		label:"Nick"
	},
	{
		name: "login",
		type:"text",
		label:"Login"
	},
	{
		name: "password",
		type:"password",
		label:"Password"
	},
	{
		name: "confirmPassword",
		type:"password",
		label:"Confirm password"
	}

]

let RegistrationForm = props => {
	const { handleSubmit, submitting, pristine, reset } = props;
	return (
	  <form onSubmit={handleSubmit}>
		 { field.map((elem, index)=> {
			 const {name, type, label} = elem
			return <div key={index} >
 				<Field name={name} component={renderField} type={type}  label={label} />
				</div>
		 })}
		<button type="submit" disabled={submitting} className="button">Registration</button>
		<button
        type="button"
        disabled={pristine || submitting}
        onClick={reset}
        className="button"
      >
        Clear Values
      </button>
	  </form>
	)
  }
  
  RegistrationForm = reduxForm({
	form: 'Registration',
	validate
  })(RegistrationForm)





export default connect(
null,
	actions
)(Registration);