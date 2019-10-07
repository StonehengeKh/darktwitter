import React, { Component } from "react";
import { connect } from "react-redux";
import "./style.css";
import * as actions from "../../actions/user";

class UserCab extends Component {
  render() {
    const { user } = this.props;
    return <div>{user.login}</div>;
  }
}

const mapStateToProps = ({userReduser}) => {
  return {
    user: userReduser.user
  };
};

export default connect(
  mapStateToProps,
  actions
)(UserCab);
