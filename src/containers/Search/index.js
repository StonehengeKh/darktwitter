import React, { useState } from "react";
import { connect } from "react-redux";
import { searchPosts, searchUser } from "../../actions/search";
import Card from "../../components/Card";
import { url} from "../../actions/user";
import avatar from "../../assets/img/smile.jpg"
import { Link } from "react-router-dom";

import "./style.css";

const Search = ({
  searchPosts,
  isFetching,
  postsFail,
  posts,
  searchUser,
  userFail,
  userS,
  user
}) => {
  const [searchPostValue, setSearchPostValue] = useState("");
  const [searchUserValue, setSearchUserValue] = useState("");
  const startSearchPost = () => {
    searchPosts(searchPostValue);
    setSearchPostValue("");
  };
  const startSearchUser = () => {
    searchUser(searchUserValue);
    setSearchUserValue("");
  };
  return (
    <div className="search-block">
      {isFetching && <div>Loading...</div>}
      <>
        <h3>Search post</h3>
        <input
          className="input"
          value={searchPostValue}
          onChange={event => setSearchPostValue(event.target.value)}
        />
        <span className="button icon-search" onClick={startSearchPost} />
        {postsFail && <div>Post not found</div>}
      </>
      <>
        <h3>Search user</h3>
        <input
          className="input"
          value={searchUserValue}
          onChange={event => setSearchUserValue(event.target.value)}
        />
        <span className="button icon-search" onClick={startSearchUser} />
        {userFail && <div>User not found</div>}
      </>
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

      {userS && (
        <Link to={`users/${userS._id}`}>
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
              <p className="user-login">{userS.nick || userS.login}</p>
            {user.following &&
            user.following.some(user => user.id === userS._id) ? (
              <span
                className="followers-border icon-minus"
                onClick={() => this.delFollowin(userS._id)}
              />
            ) : (
              <span
                className="followers-border icon-plus"
                onClick={() => this.addFollowin(userS._id)}
              />
            )}
          </div>
        </Link>
      )}
    </div>
  );
};

const mapStateToProps = ({ searchReducer , userReducer}) => {
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
  { searchPosts, searchUser }
)(Search);
