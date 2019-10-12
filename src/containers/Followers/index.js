import React, { Component } from "react";
import { connect } from "react-redux";
// import "./style.css";
import * as actions from "../../actions/folowing";
import { url } from "../../actions/user";
import kartinka from "../../assets/img/smile.jpg"


class Followers extends Component {
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
              <p className="user-login">{userF.login}</p>
           
             {user.followers && user.followers.some(user => user._id === userF._id) ?  null :  <span className="icon-plus"/>}
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
  actions
)(Followers);