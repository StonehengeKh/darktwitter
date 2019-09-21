import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./style.css";


class MyPage extends Component {
	state = { modal: false };

	render() {
		return (
			<div>
				MyPage
			</div >
		);
	}
}

const mapStateToProps = state => {
	return {
	};
};

export default connect(mapStateToProps)(MyPage);
