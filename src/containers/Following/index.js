import React, { Component } from "react";
import { connect } from "react-redux";
import "./style.css";
import * as actions from "../../actions/folowing";

class Following extends Component {

  render() {
    const { following } = this.props;
    return <div>
    {following && following.map(user => <p key={user._id}>{user.login}</p>)}
    
   </div>;
  }
}

const mapStateToProps = ({folowingReduser}) => {
  return {
    following: folowingReduser.following
  };
};

export default connect(
  mapStateToProps,
  actions
)(Following);
