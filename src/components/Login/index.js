import React, { Component } from "react";
// import axios from "axios";
import { connect } from "react-redux";
import * as actions from "../../actions/user";
import { Input } from "../Input";
import './style.css'

const FORM_TEMPLATE = {
	login: {
		type: "text",
		name: "login",
		label: "Login",
		placeholder: "Your login",
		value: "",
		className:"input-number",
		validate: {
			require: {
				cb: v => v.trim() === ""
			}
		},
		touch: false,
		valid: false
	},
	password: {
		type: "password",
		name: "password",
		label: "Password",
		placeholder: "Your password",
		value: "",
		className:"input-number",
		validate: {
			require: {
				cb: v => v.trim() === ""
			},
			minL: {
				cb: v => v.trim().length < 6
			}
		},
		touch: false,
		valid: false
	}
};

class Login extends Component {
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
					valid: this.validator(prevState.form[name].validate, value),
				}
			}
		}));
	};

	clearEvent = () => this.setState({ form: FORM_TEMPLATE, formValid: false });

	sendRequest = async () => {
		const { userLogin } = this.props;
		const values = Object.keys(this.state.form).reduce((prev, elem) => {
			return { ...prev, [elem]: this.state.form[elem].value };
		}, {});
		userLogin(values)
		this.clearEvent()
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
							value={form[el].value}
							onChange={this.onChangeHandler}
							label={form[el].label}
							type={form[el].type}
							valid={form[el].valid}
							touch={form[el].touch}
						/> 
					)}
					<button onClick={this.sendRequest} type="button" className="button">
						Log In
					</button>
				</form>
			</div>
		);
	}
}


const mapStateToProps = state => {
	return {
		user: state.userReduser.user,
	};
};

export default connect(
	mapStateToProps,
	actions
)(Login);