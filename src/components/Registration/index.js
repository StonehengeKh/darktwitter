import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/user";
import { Input } from "../Input";

export const FORM_TEMPLATE = {
	login: {
		type: "text",
		name: "login",
		label: "Login",
		placeholder: "Your login",
		value: "",
		className: "input-number",
		touch: false,
		valid: false
	},
	email: {
		type: "email",
		name: "email",
		label: "Email",
		placeholder: "Your email",
		value: "",
		className: "input-number",
		touch: false,
		valid: false
	},
	password: {
		type: "password",
		name: "password",
		label: "Password",
		placeholder: "Your password",
		value: "",
		className: "input-number",
		touch: false,
		valid: false
	},
	confirmPassword: {
		type: "password",
		name: "confirmPassword",
		label: "Confirm password",
		placeholder: "Confirm password",
		value: "",
		className: "input-number",
		touch: false,
		valid: false
	}
};

class Registration extends Component {
	state = {
		form: FORM_TEMPLATE,
		formValid: false
	};



	validator = (rules, value) => {
		const valid = Object.keys(rules).reduce((prev, elem) => {
			if (prev) return true;
			const check = rules[elem].cb(value);
			if (!prev && check) return check;

			return false;
		}, false);

		return valid;
	};

	onChangeHandler = e => {
		const { value, name } = e.target;

		this.setState(prevState => ({
			...prevState,
			form: {
				...prevState.form,
				[name]: {
					...prevState.form[name],
					value,
					touch: true,
				}
			}
		}));
	};

	clearInput = () => {
		console.log("state before ", this.state);
		this.setState({ form: FORM_TEMPLATE, formValid: false }, () => console.log("state after", this.state));
	}

	sendRequest = () => {
		const { registration } = this.props;
		const values = Object.keys(this.state.form).reduce((prev, elem) => {
			return { ...prev, [elem]: this.state.form[elem].value };
		}, {});
		values.email.toLowerCase()
		values.role = "user"
		registration(values)
		console.log("values", values);
		this.clearInput();
	};

	render() {
		const { form } = this.state;
		return (
			<div>
				<form className="update-form"> 
					{Object.keys(form).map(el =>
						<Input
							key={el}
							placeholder={form[el].placeholder}
							name={form[el].name}
							value={form[el].value.toLowerCase()}
							onChange={this.onChangeHandler}
							label={form[el].label}
							type={form[el].type}
							valid={form[el].valid}
							touch={form[el].touch}
							className={form[el].className}
						/>
					)}

					{this.state.form.login.value.length > 3 && this.state.form.email.value.includes("@") && this.state.form.password.value.length > 6 && this.state.form.password.value === this.state.form.confirmPassword.value ? <button onClick={this.sendRequest} type="button" className="button">
						Registration
					</button> : null}
				</form>
			</div>
		);
	}
}


const mapStateToProps = state => {
	return {
		user: state.userReduser.user
	};
};

export default connect(
	mapStateToProps,
	actions
)(Registration);