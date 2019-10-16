import React, { Component } from "react";
import { connect } from "react-redux";
import "./style.css";
import { url, userUpsertFollowing } from "../../actions/user";
import kartinka from "../../assets/img/smile.jpg";

class Users extends Component {
  addFollowin = id => {
    const { user, userUpsertFollowing } = this.props;
    let newFollowing = user.following
      ? user.following.map(x => {
          delete x.avatar;
          delete x.nick;
          delete x.login;
          return x;
        })
      : ( []);
    newFollowing.push({ _id: id });
    console.log(newFollowing);
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
                  <img src={kartinka} className="avatar-img" alt="avatar" />
                )}
                {userF.login && (
                  <p className="user-login">{userF.nick || userF.login}</p>
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

const mapStateToProps = ({ usersReduser, userReduser }) => {
  return {
    users: usersReduser.users,
    user: userReduser.user
  };
};

export default connect(
  mapStateToProps,
  { userUpsertFollowing }
)(Users);
