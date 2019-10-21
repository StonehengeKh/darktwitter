import React, { Component } from "react";
import { connect } from "react-redux";
// import "./style.css";
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
      <div>
        {following &&
          following.map(userF => {
            return (
              <Link to={`users/${userF._id}`} key={userF._id}><div className="user-wrap">
                {userF.avatar ? (
                  <img
                    src={url + userF.avatar.url}
                    className="avatar-img"
                    alt="avatar"
                  />
                ) : (
                  <img src={avatar} className="avatar-img" alt="avatar" />
                )}
                <p className="user-login">{userF.nick || userF.login}</p>
                <span
                  className="followers-border icon-minus"
                  onClick={() => this.delFollowin(userF._id)}
                />
              </div></Link>
            );
          })}
      </div>
    );
  }
}

const mapStateToProps = ({ userReduser }) => {
  return {
    following: userReduser.user.following,
    user: userReduser.user
  };
};

export default connect(
  mapStateToProps,
  { userUpsertFollowing }
)(Following);
