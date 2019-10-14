import React, { Component } from "react";
import { connect } from "react-redux";
// import "./style.css";
import { url, userUpsertFollowing } from "../../actions/user";
import kartinka from "../../assets/img/smile.jpg"


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
    console.log(newFollowing);
    userUpsertFollowing(user.id, newFollowing);
  };

  render() {
    const { followers, user} = this.props;
    return (
      <div>
        {followers && 
          followers.map(userF => {
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
             {user.following && user.following.some(user => user._id === userF._id) ?  null : <span className="followers-border icon-plus"
              onClick={() => this.addFollowin(userF._id)} 
             /> }
            </div>
        })}
      </div>
    );
  }
}

const mapStateToProps = ({ userReduser }) => {
  return {
    followers: userReduser.user.followers,
    user: userReduser.user,
  };
};

export default connect(
  mapStateToProps,
  {userUpsertFollowing}
)(Followers);