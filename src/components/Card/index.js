import React from "react";
import { Link } from "react-router-dom";
import avatar from "../../assets/img/smile.jpg";
import { url } from "../../actions/user";
import { connect } from "react-redux";
import { addLikePosts, delLikePosts } from "../../actions/likes";

export const formatDate = date => {
  if (date.indexOf(".") !== -1) return date;
  var mass = date.split("/");
  return [mass[1], mass[0], mass[2]].join(".");
};

function Card(props) {
  const checkLike = () => {
    console.log(props)
    const { user } = props;
    let like = props.likes.find(like => like.owner._id === user.id);
    like ? props.delLikePosts(like._id, props.id)  : props.addLikePosts(props.id);
  };
  return (
    <div className="all-post-conteiner" key={props.id}>
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
        {props.title ? (
          <div className="title">
            <Link to={`/post/${props.id}`}> {props.title} </Link>
          </div>
        ) : (
          <div className="title">
            <Link to={`/post/${props.id}`}> Title </Link>
          </div>
        )}
        {props.text ? <div className="card-text">{props.text}</div> : null}
        {props.images ? (
          <div>
            {" "}
            {props.images.map(image => {
              return (
                <img
                  key={image._id}
                  alt="img"
                  src={`http://hipstagram.asmer.fs.a-level.com.ua/${image.url}`}
                  className="all-post-img"
                ></img>
              );
            })}
          </div>
        ) : null}
        <div className="post-like">
          <button
            className={
              props.likes.some(like => like.owner._id === props.user.id)
                ? "icon-heart like-button like-red"
                : "icon-heart like-button like-white"
            }
            onClick={props.likeFetching ? null : checkLike}
          ></button>
          <span className="like">{props.likes.length}</span>
          <span className="icon-bubbles4"></span>
          <span className="posts-commnets">
            {props.comments ? props.comments.length : 0}
          </span>
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
  { addLikePosts, delLikePosts }
)(Card);
