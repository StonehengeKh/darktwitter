import React, { Component } from "react";
import { connect } from "react-redux";
import "./style.css";
import { url, userUpsertFollowing } from "../../actions/user";
import avatar from "../../assets/img/smile.jpg";
import { Link } from "react-router-dom";

class Following extends Component {
  delFollowin = id => {
    const { user, userUpsertFollowing } = this.props;
    let newFollowing = user.following
      .filter(user => user._id !== id)
      .map(x => {
        delete x.avatar;
        delete x.nick;
        delete x.login;
        return x;
      });
    userUpsertFollowing(user.id, newFollowing);
  };

  render() {
    const { following } = this.props;
    return (
      <div className="followings">
        {following &&
          following.map(userF => {
            return (
              <div className="user-wrap" key={userF._id}>
                {userF.avatar ? (
                  <img
                    src={url + userF.avatar.url}
                    className="avatar-img"
                    alt="avatar"
                  />
                ) : (
                  <img src={avatar} className="avatar-img" alt="avatar" />
                )}
                <Link to={`users/${userF._id}`}>
                  <p className="user-login">{userF.nick || userF.login}</p>{" "}
                </Link>
                <span
                  className="followers-border icon-minus"
                  onClick={() => this.delFollowin(userF._id)}
                />
              </div>
            );
          })}
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer }) => {
  return {
    following: userReducer.user.following,
    user: userReducer.user
  };
};

export default connect(
  mapStateToProps,
  { userUpsertFollowing }
)(Following);
