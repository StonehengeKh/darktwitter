import React, { Component } from "react";
import { connect } from "react-redux";

import "./style.css";
import { url, userUpsertFollowing } from "../../actions/user";
import avatar from "../../assets/img/smile.jpg"
import { Link } from "react-router-dom";
// import Preloader from "../../components/Preloader"


class Followers extends Component {

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
    userUpsertFollowing(user.id, newFollowing);
  };

  render() {
    const { followers, user} = this.props;
    return (
      <div className="followers">
        {followers &&
          followers.map(userF => {
            return <Link to={`users/${userF._id}`} key={userF._id}><div  className="user-wrap">
              {userF.avatar ? (
                <img src={url + userF.avatar.url} className="avatar-img" alt="avatar"/>
              ) : (
                <img
                  src={avatar}
                  className="avatar-img"
                  alt="avatar"
                />
              )}
              <p className="user-login">{userF.nick || userF.login}</p>
             {user.following && user.following.some(user => user._id === userF._id) ?  null : <span className="followers-border icon-plus"
              onClick={() => this.addFollowin(userF._id)}
             /> }
            </div>
            </Link>
        })}
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer }) => {
  return {
    followers: userReducer.user.followers,
    user: userReducer.user,
  };
};

export default connect(
  mapStateToProps,
  {userUpsertFollowing}
)(Followers);