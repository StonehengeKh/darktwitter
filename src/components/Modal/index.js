import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./style.css";

export default class Modal extends Component {

	render() {
		const { children } = this.props;
		return ReactDOM.createPortal(<div className="modal">{children}</div>, document.body);
	}
}