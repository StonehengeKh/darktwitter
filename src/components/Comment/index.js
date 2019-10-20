import React, { useState } from "react";
import avatar from "../../assets/img/smile.jpg";
import { url } from "../../actions/user";
import { connect } from "react-redux";
import { formatDate } from "../Card";
import { editComment } from "../../actions/post";

function Comment(props) {
  const [isInputOpen, openInput] = useState(false);
  const Form = (props) => {
    const [textValue, setTextValue] = useState("");
    const submit = (event)=>{
      event.preventDefault();
      props.edit(textValue, props.id, props.postID)
      openInput(!isInputOpen)
    }
    return (
      <form  onSubmit={event => submit(event)}>
        <input
          onChange={event => setTextValue(event.target.value)}
          value={textValue}
          className="input"
        />
        <button className="button">Save</button>
      </form>
    );
  };
  const closed = () => openInput(!isInputOpen)
  const checkLike = () => {
    const { user } = props;
    // let like = props.likes.find(like => like.ownerID === user.id);
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
      <div className="comment-context">
        <div className="nick-posts">
          {props.nick || props.login}
          <span className="createdAt-posts">
            {formatDate(new Date(+props.createdAt).toLocaleDateString())}
          </span>
        </div>
        {props.text ? (
          isInputOpen ? (
            <Form id={props.id} edit={props.editComment} postID={props.postID} onClick={closed}/>
          ) : (
            <div className="card-text">{props.text}</div>
          )
        ) : isInputOpen ? (
          <Form id={props.id} edit={props.editComment} postID={props.postID} onClick={closed}/>
        ) : null}
        <div className="post-like">
          <div>
            <button
              className={
                props.likes.some(like => like.owner._id === props.user.id)
                  ? "icon-heart like-button like-red"
                  : "icon-heart like-button like-white"
              }
              onClick={props.likeFetching ? null : checkLike}
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

const mapStateToProps = ({ userReduser, postReduser }) => {
  return {
    user: userReduser.user,
    commentFetching: postReduser.commentFetching
  };
};

export default connect(mapStateToProps, {editComment})(Comment);
