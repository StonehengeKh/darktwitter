import React, { Component } from "react";
import { connect } from "react-redux";

import "./style.css";



class MyPage extends Component {
	state = { modal: false };


	render() {
		const {user} = this.props
		return (
			<div>
				hellow {user.login}
			</div >
		);
	}
}

const mapStateToProps = state => {
	return {
		user: state.userReduser.user
	};
};

export default connect(mapStateToProps)(MyPage);
