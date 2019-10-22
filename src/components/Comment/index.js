import React, { useState } from "react";
import avatar from "../../assets/img/smile.jpg";
import { url } from "../../actions/user";
import { connect } from "react-redux";
import { formatDate } from "../Card";
import { Link } from "react-router-dom";
import {
  editComment,
  addLikeComment,
  delLikeComment
} from "../../actions/post";

function Comment(props) {
  const [isInputOpen, openInput] = useState(false);
  const Form = props => {
    const [textValue, setTextValue] = useState("");
    const [touch, changeTouch] = useState(false);
    if (!touch) {
      setTextValue(props.text);
      changeTouch(true);
    }
    const submit = event => {
      event.preventDefault();
      if (textValue.length > 2 ) {
        props.edit(textValue, props.id, props.postID);
        openInput(!isInputOpen);
      }
    };
    return (
      <form onSubmit={event => submit(event)}>
        <input
          onChange={event => setTextValue(event.target.value)}
          value={textValue}
          className="input"
        />
        <button className="button">Save</button>
      </form>
    );
  };

  const checkLike = () => {
    const { user, addLikeComment, delLikeComment } = props;
    let like = props.likes.find(like => like.owner._id === user.id);
    like
      ? delLikeComment(like._id, props.postID)
      : addLikeComment(props.id, props.postID);
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
      <div className="comment-context">
        <div className="nick-posts">
        <Link to={`/users/${props.ownerID}`}>{props.nick || props.login}</Link>
          <span className="createdAt-posts">
            {formatDate(new Date(+props.createdAt).toLocaleDateString())}
          </span>
        </div>
        {props.text ? (
          isInputOpen ? (
            <Form
              id={props.id}
              edit={props.editComment}
              postID={props.postID}
              text={props.text}
            />
          ) : (
            <div className="card-text">{props.text}</div>
          )
        ) : isInputOpen ? (
          <Form
            id={props.id}
            edit={props.editComment}
            postID={props.postID}
            text={props.text}
          />
        ) : null}
        <div className="comment-like">
          <div>
            <button
              className={
                props.likes.some(like => like.owner._id === props.user.id)
                  ? "icon-heart like-button like-red"
                  : "icon-heart like-button like-white"
              }
              onClick={props.LCFetching ? null : checkLike}
            ></button>
            <span className="like">{props.likes.length}</span>
          </div>
          {props.user.id === props.ownerID ? (
            <button
              className="button edit-comment"
              onClick={() => openInput(!isInputOpen)}
            >
              {isInputOpen ? "Cancel" : "Edit"}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ userReducer, postReducer }) => {
  return {
    user: userReducer.user,
    commentFetching: postReducer.commentFetching,
    LCFetching: postReducer.LCFetching
  };
};

export default connect(
  mapStateToProps,
  { editComment, addLikeComment, delLikeComment }
)(Comment);
