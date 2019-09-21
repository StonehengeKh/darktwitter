import React, { Component } from "react";
import Login from '../Login'
import Regisration from '../Registration'
import { connect } from "react-redux";
import * as actions from "../../actions/user";
import { Redirect,  Route  } from "react-router-dom";
import './style.css'

export class Auth extends Component {
	state = { login: true };

	toggleAuthProperty = () => this.setState(prevState => ({ ...prevState, login: !prevState.login }));

	render() {
		const { isFetching, incorected, mailExists, user } = this.props;
		const { login } = this.state;
		return (
			<div>
				<div>
					{isFetching && <p>Loading...</p>}
					{login ? <Login /> : <Regisration />}

					{login ? (
						<button onClick={this.toggleAuthProperty} className="button">Do you have accaunt ?</button>
					) : (
							<button onClick={this.toggleAuthProperty} className="button">I already have an account</button>
						)}
				</div>
				{incorected && <p className="error text_response">Incorected login/password</p>}
				{mailExists && <p className="error text_response">Email already exists</p>}
				{user ? <p>{user.login}</p> : null}
					<Route  render={() => (
						user ? <Redirect to='/usercab' />
							: null
					)} />
			</div>
		);
	}
}
const mapStateToProps = state => {
	return {
		user: state.userReduser.user,
		isFetching: state.userReduser.isFetching,
		incorected: state.userReduser.incorected,
		mailExists: state.userReduser.mailExists
	};
};

export default connect(
	mapStateToProps,
	actions
)(Auth);