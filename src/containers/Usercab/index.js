import React, { useState } from "react";
import { connect } from "react-redux";
import { createNewPost } from "../../actions/addPost"
import SettingMenu from "../../components/settingMenu";
import "./style.css";
import {userUpsertNick,userUpsertAvatar } from "../../actions/user";
import Post from "../../components/userPagePostItem";

const UserCab = ({
  user,
  userUpsertNick,
  userUpsertAvatar,
  upsertFetching,
  createNewPost,
  posts
}) => {
  const [nick, setNick] = useState("");
  const [isSetOpen, openSettings] = useState(false);
  const [isNewPost, openNewPostWindow] = useState(false);
  const [titleValue, setTitleValue] = useState("");
  const [textValue, setTextValue] = useState("");
  const nickChange = e => setNick(e.target.value);
  const nickClear = () => setNick("");
  const send = () => {
    userUpsertNick(user.id, nick);
    nickClear();
  };
  let userAvatar;
  if (!!user && !!user.avatar) {
    userAvatar = user.avatar.url;
  }
  const getValues = event => {
    event.preventDefault();
    createNewPost({ title: titleValue, text: textValue })
    openNewPostWindow(false)
  };
  console.log(posts)
  return (
    <main className="userCabMain">
      {!!userAvatar && (
        <section className="userInfo">
          <h2>{user.nick}</h2>
          <img src={userAvatar} alt="avatar" className="avatar" />
          <div className="generalInfo"></div>
          <button className="btn-edit" onClick={() => openSettings(!isSetOpen)}>EDIT</button>
          {isSetOpen && (
            <SettingMenu
              upsertFetching={upsertFetching}
              user={user}
              nickHandler={nickChange}
              sendHandler={send}
              userUpsertAvatar={userUpsertAvatar}
              nick={nick}
            />
          )}
        </section>
      )}
      <button onClick={() => openNewPostWindow(!isNewPost)}>ADD POST</button>
      {isNewPost && <form onSubmit={event => getValues(event)}>
        <input
          onChange={event => setTitleValue(event.target.value)}
          value={titleValue}
        />
        <textarea
          onChange={event => setTextValue(event.target.value)}
          value={textValue}
        />
        <button type="submit">console</button>
      </form>}
      <section className="myPostsSection">
        {posts && posts.map(post => <Post post={post} user={user} key={post._id}/>)}
      </section>
    </main>
  );
};

const mapStateToProps = ({ userReduser, myPostsReduser }) => {
  return {
    user: userReduser.user,
    upsertFetching: userReduser.upsertFetching,
    posts: myPostsReduser.myPosts
  };
};

export default connect(
  mapStateToProps,
  {userUpsertNick, userUpsertAvatar, createNewPost }
)(UserCab);
