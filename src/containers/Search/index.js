import React, { useState } from "react";
import { connect } from "react-redux";

import { searchPosts, searchUser } from "../../actions/search";
import Card from "../../components/Card";
import { url, userUpsertFollowing } from "../../actions/user";
import avatar from "../../assets/img/smile.jpg";
import { Link } from "react-router-dom";
import Preloader from "../../components/Preloader";

import "./style.css";

const Search = ({
  searchPosts,
  isFetching,
  postsFail,
  posts,
  searchUser,
  userFail,
  userS,
  user,
  userUpsertFollowing
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [isPostSearch, setpostSearch] = useState(false);

  const startSearch = () => {
    if (searchValue.length > 2) {
      !isPostSearch ? searchUser(searchValue) : searchPosts(searchValue);
      setSearchValue("");
    }
  };
  const addFollowin = id => {
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
  return (
    <div className="search-block">
      {isFetching && <Preloader />}
      <div className="search-user-block">
        <div className="block-search">
          <div className="search-header">
            <h3>Search {!isPostSearch ? "user" : "post"}</h3>
            <input
              className="input"
              value={searchValue}
              onChange={event => setSearchValue(event.target.value)}
            />
            <span
              className="button icon-search button-top"
              onClick={startSearch}
            />
          </div>

          <div className="searchButtons">
            <button
              onClick={() => setpostSearch(false)}
              className={isPostSearch ? "btn-create-disable" : "btn-create"}
            >
              User
            </button>
            <button
              onClick={() => setpostSearch(true)}
              className={!isPostSearch ? "btn-create-disable" : "btn-create"}
            >
              Posts
            </button>
          </div>
        </div>
      </div>
      {!isPostSearch ? (
        <div className="search-page-block">
          {userFail && <div>User not found</div>}
          {userS && (
            <div className="user-wrap">
              {userS.avatar ? (
                <img
                  src={url + userS.avatar.url}
                  className="avatar-img"
                  alt="avatar"
                />
              ) : (
                <img src={avatar} className="avatar-img" alt="avatar" />
              )}
              <Link to={`users/${userS._id}`}>
                <p className="user-login">{userS.nick || userS.login}</p>{" "}
              </Link>
              {user.following &&
              user.following.some(user => user._id === userS._id) ? null : (
                <span
                  className="followers-border icon-plus"
                  onClick={() => addFollowin(userS._id)}
                />
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="search-page-block">
          <div className="block-search">
            {postsFail && <div>Post not found</div>}
          </div>

          {posts &&
            posts.map(post => {
              const {
                title,
                text,
                images,
                owner,
                createdAt,
                comments,
                likes,
                _id
              } = post;
              return (
                <Card
                  title={title}
                  key={_id}
                  id={_id}
                  images={images}
                  text={text}
                  avatar={owner.avatar}
                  nick={owner.nick}
                  login={owner.login}
                  createdAt={createdAt}
                  comments={comments}
                  likes={likes}
                  ownerId={owner._id}
                />
              );
            })}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ searchReducer, userReducer }) => {
  return {
    isFetching: searchReducer.isFetching,
    posts: searchReducer.posts,
    userS: searchReducer.userS,
    postsFail: searchReducer.postsFail,
    userFail: searchReducer.userFail,
    user: userReducer.user
  };
};

export default connect(
  mapStateToProps,
  { searchPosts, searchUser, userUpsertFollowing }
)(Search);
