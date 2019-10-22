import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { createNewPost } from "../../actions/addPost";
import SettingMenu from "../../components/settingMenu";
import "./style.css";
import { userUpsertNick, userUpsertAvatar } from "../../actions/user";
import Post from "../../components/userPagePostItem";
import defaultAvatar from "../../assets/img/smile.jpg";
import Modal from "../../components/Modal";
import { getAllMyPosts } from "../../actions/myposts";

const UserCab = ({
  user,
  userUpsertNick,
  userUpsertAvatar,
  upsertFetching,
  getAllMyPosts,
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
    createNewPost({ title: titleValue, text: textValue });
    openNewPostWindow(false);
  };
  useEffect(() => {
    getAllMyPosts();
  }, []);

  return (
    <main className="userCabMain">
      {!!user && (
        <section className="userInfo">
          <div className="generalInfo">
            <img
              src={userAvatar ? userAvatar : defaultAvatar}
              alt="avatar"
              className="avatar"
            />
            <h2>{user.nick}</h2>
          </div>
          <button className="btn-edit" onClick={() => openSettings(!isSetOpen)}>
            EDIT
          </button>
          {isSetOpen && (
            <Modal className="setting-modal">
              <SettingMenu
                upsertFetching={upsertFetching}
                user={user}
                nickHandler={nickChange}
                sendHandler={send}
                userUpsertAvatar={userUpsertAvatar}
                nick={nick}
                handleClose={openSettings}
              />
            </Modal>
          )}
        </section>
      )}
      <button
        onClick={() => openNewPostWindow(!isNewPost)}
        className="btn-create"
      >
        CREATE POST
      </button>
      {isNewPost && (
        <form onSubmit={event => getValues(event)} className="createForm">
          <input
            onChange={event => setTitleValue(event.target.value)}
            value={titleValue}
          />
          <textarea
            onChange={event => setTextValue(event.target.value)}
            value={textValue}
          />
          <button type="submit" className="btn-create form-create">
            Create
          </button>
        </form>
      )}
      <section className="myPostsSection">
        {posts &&
          posts.map(post => <Post post={post} user={user} key={post._id} />)}
      </section>
    </main>
  );
};

const mapStateToProps = ({ userReducer, myPostsReducer }) => {
  return {
    user: userReducer.user,
    upsertFetching: userReducer.upsertFetching,
    posts: myPostsReducer.myPosts
  };
};

export default connect(
  mapStateToProps,
  { userUpsertNick, userUpsertAvatar, createNewPost, getAllMyPosts }
)(UserCab);
