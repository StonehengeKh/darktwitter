import React, { useState } from "react";
import { connect } from "react-redux";

import SettingMenu from '../../components/settingMenu'
import "./style.css";
import * as actions from "../../actions/user";
import Post from '../../components/userPagePostItem'

const UserCab = ({ user, UserUpsertNick, UserUpsertAvatar, upsertFetching, posts }) => {
  const [nick, setNick] = useState("")
  const [isSetOpen, openSettings] = useState(false)
  const nickChange = e => setNick(e.target.value);
  const nickClear = () => setNick("");
  const send = () => {
    UserUpsertNick(user.id, nick);
    nickClear();
  };
  let userAvatar
  if (!!user && !!user.avatar) {
    userAvatar = user.avatar.url
  }


  return (
    <main className="userCabMain">

      {!!userAvatar && <section className="userInfo">
        <h2>{user.nick}</h2>
        <img src={userAvatar} alt="avatar" />
        <div className="generalInfo"></div>
        <button onClick={() => openSettings(!isSetOpen)}>EDIT</button>
        {isSetOpen &&
          <SettingMenu
            upsertFetching={upsertFetching}
            user={user}
            nickHandler={nickChange}
            sendHandler={send}
            UserUpsertAvatar={UserUpsertAvatar}
            nick={nick} />}
      </section>}
      <button>ADD POST</button>
      <section className="myPostsSection">
      {posts && posts.map((post, index) => <Post post={post} user={user} key={index}/>)}
      </section>
    </main>
  );
}

const mapStateToProps = ({ userReduser, myPostsReduser }) => {
  return {
    user: userReduser.user,
    upsertFetching: userReduser.upsertFetching,
    posts: myPostsReduser.myPosts
  };
};

export default connect(
  mapStateToProps,
  actions
)(UserCab);
