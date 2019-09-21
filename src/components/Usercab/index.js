import React, { Component } from "react";
import { connect } from "react-redux";
import './style.css'
import * as actions from "../../actions/user";
import { FORM_TEMPLATE } from '../Registration'
import { Input } from "../Input";


class UserCab extends Component {
	state = { change: false }



	change = () => this.setState(prevState => ({ ...prevState, change: !prevState.change }));
	userSave = () => {
		const { updateUs, updateUserSave, user } = this.props;
		const newUser = { ...updateUs }
		delete newUser.id;
		updateUserSave(user.id, newUser, user.email)
	}

	render() {
		const { user, updateUser, touch, updateError, update, setUserToUpdate, updateUs } = this.props;
		console.log()

		return (
			<div>

				<div><button className="button" onClick={setUserToUpdate}>Change user info</button></div>
				{update && <p>Loading...</p>}
				{ updateError ? <p className="error text_response">Email already exists</p> : null}
				{updateUs ? (
					<>
						<form className="update-form">
							{Object.keys(FORM_TEMPLATE).map(el =>
								<Input
									key={el}
									placeholder={FORM_TEMPLATE[el].placeholder}
									name={FORM_TEMPLATE[el].name}
									value={updateUs[el]}
									onChange={e => updateUser(e.target.name, e.target.value)}
									label={FORM_TEMPLATE[el].label}
									type={FORM_TEMPLATE[el].type}
									valid={FORM_TEMPLATE[el].valid}
									touch={FORM_TEMPLATE[el].touch}
									className={FORM_TEMPLATE[el].className}
								/>)}
						</form>
						{touch && updateUs.login.length > 3 && updateUs.email.includes("@") && updateUs.password.length > 6 && updateUs.password === updateUs.confirmPassword ? <button className="button" onClick={this.userSave}>Save</button> : null}
					</>
				) : null	}

				<p className="text_response">	Login: {user.login}</p>
				<p className="text_response">	Email: {user.email}</p>

			</div >
		);
	}
}

const mapStateToProps = state => {
	return {
		user: state.userReduser.user,
		update: state.userReduser.update,
		updateUs: state.userReduser.updateUs,
		touch: state.userReduser.touch,
		updateError: state.userReduser.updateError,
	};
};

export default connect(mapStateToProps, actions)(UserCab);