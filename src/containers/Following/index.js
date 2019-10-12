import React, { Component } from "react";
import { connect } from "react-redux";
// import "./style.css";
import * as actions from "../../actions/users";
import { url } from "../../actions/user";
import kartinka from "../../assets/img/smile.jpg"


class Following extends Component {
  render() {
    const { following, user} = this.props;
    return (
      <div>
        {following && 
          following.map(userF => {
            return <div key={userF._id} className="user-wrap">
              {userF.avatar ? (
                <img src={url + userF.avatar.url} className="avatar-img" alt="avatar"/>
              ) : (
                <img
                  src={kartinka}
                  className="avatar-img"
                  alt="avatar"
                />
              )}
              <p className="user-login">{userF.nick || userF.login}</p>
              <span className="icon-minus"/>
            </div>
        })}
      </div>
    );
  }
}

const mapStateToProps = ({ userReduser }) => {
  return {
    following: userReduser.user.following,
    user: userReduser.user,
  };
};

export default connect(
  mapStateToProps,
  actions
)(Following);