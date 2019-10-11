import React, { Component } from "react";
import { connect } from "react-redux";
import "./style.css";
import * as actions from "../../actions/folowing";
import { url } from "../../actions/user";
import kartinka from "../../assets/img/smile.jpg"


class Following extends Component {
  render() {
    const { following } = this.props;
    return (
      <div>
        {following &&
          following.map(user => (
            <div key={user._id} className="user-wrap">
              {user.avatar ? (
                <img src={url + user.avatar.url} className="avatar-img" alt="avatar"/>
              ) : (
                <img
                  src={kartinka}
                  className="avatar-img"
                  alt="avatar"
                />
              )}
              <p className="user-login">{user.login}</p>
            </div>
          ))}
      </div>
    );
  }
}

const mapStateToProps = ({ folowingReduser }) => {
  return {
    following: folowingReduser.following
  };
};

export default connect(
  mapStateToProps,
  actions
)(Following);
