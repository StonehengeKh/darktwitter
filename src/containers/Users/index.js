import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./style.css";
import { url, userUpsertFollowing } from "../../actions/user";
import { userFind } from "../../actions/users";
import avatar from "../../assets/img/smile.jpg";

class Users extends Component {
  componentDidMount() {
    this.props.userFind();
  }

  addFollowin = id => {
    const { user, userUpsertFollowing } = this.props;
    let newFollowing = user.following
      ? user.following.map(x => {
          delete x.avatar;
          delete x.nick;
          delete x.login;
          return x;
        })
      : [];
    newFollowing.push({ _id: id });
    userUpsertFollowing(user.id, newFollowing);
  };

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
    const { users, user } = this.props;
    return (
      <div className="user-page">
        {users &&
          users.map(userF => {
            return (
              <div key={userF._id} className="user-wrap">
                {userF.avatar ? (
                  <img
                    src={url + userF.avatar.url}
                    className="avatar-img"
                    alt="avatar"
                  />
                ) : (
                  <img src={avatar} className="avatar-img" alt="avatar" />
                )}
                {userF.login && (
                  <Link to={`users/${userF._id}`}>
                    <p className="user-login">{userF.nick || userF.login}</p>
                  </Link>
                )}
                {user.following &&
                user.following.some(user => user._id === userF._id) ? (
                  <span
                    className="followers-border icon-minus"
                    onClick={() => this.delFollowin(userF._id)}
                  />
                ) : (
                  <span
                    className="followers-border icon-plus"
                    onClick={() => this.addFollowin(userF._id)}
                  />
                )}
              </div>
            );
          })}
      </div>
    );
  }
}

const mapStateToProps = ({ usersReducer, userReducer }) => {
  return {
    users: usersReducer.users,
    user: userReducer.user
  };
};

export default connect(
  mapStateToProps,
  { userUpsertFollowing, userFind }
)(Users);
