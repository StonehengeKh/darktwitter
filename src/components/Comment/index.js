import React from "react";
import avatar from "../../assets/img/smile.jpg";
import { url } from "../../actions/user";
import { connect } from "react-redux";
import {formatDate} from "../Card"


function Comment(props) {
  const checkLike = () => {
    const { user } = props;
    // let like = props.likes.find(like => like.owner._id === user.id);
    // like ? props.delLikePosts(like._id, props.id)  : props.addLikePosts(props.id);
  };
  return (
    <div className="comment-conteiner" key={props.id}>
      <div className="avatar-conteiner">
        {props.avatar ? (
          <img
            src={url + props.avatar.url}
            className="avatar-posts"
            alt="avatar"
          />
        ) : (
          <img src={avatar} className="avatar-posts" alt="avatar" />
        )}
      </div>
      <div>
        <div className="nick-posts">
          {props.nick || props.login}
          <span className="createdAt-posts">
            {formatDate(new Date(+props.createdAt).toLocaleDateString())}
          </span>
        </div>
        {props.text ? <div className="card-text">{props.text}</div> : null}
        <div className="post-like">
          <button
            className={
              props.likes ?  props.likes.some(like => like.owner._id === props.user.id)
                ? "icon-heart like-button like-red"
                : "icon-heart like-button like-white" : "icon-heart like-button like-white"
            }
            onClick={props.likeFetching ? null : checkLike}
          ></button>
          <span className="like">{props.likes ? props.likes.length : 0}</span>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ userReduser, postsReduser }) => {
  return {
    user: userReduser.user,
    likeFetching: postsReduser.likeFetching
  };
};

export default connect(
  mapStateToProps,
)(Comment);