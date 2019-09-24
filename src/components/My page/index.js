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
				<img src="http://hipstagram.asmer.fs.a-level.com.ua/images/de27fb210820dfdf3d1f54e44ec1e1c3" />
			</div >
		);
	}
}

const mapStateToProps = state => {
	return {
	};
};

export default connect(mapStateToProps)(MyPage);
