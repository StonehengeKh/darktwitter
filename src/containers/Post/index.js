import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { addLike, delLike } from "../../actions/likes";
import "./style.css";
import { getPost, addNewComment } from "../../actions/post";
import avatar from "../../assets/img/smile.jpg";
import { url } from "../../actions/user";
import { formatDate } from "../../components/Card";
import Comment from "../../components/Comment";
import Preloader from "../../components/Preloader";

class Post extends Component {
  state = { comment: "" };

  componentDidMount() {
    const { getPost } = this.props;
    getPost(this.props.match.params.id);
  }

  submitComment = event => {
    const { addNewComment, post } = this.props;
    event.preventDefault();
    if (this.state.comment.length > 2) {
      addNewComment(this.state, post._id);
      this.clearComment();
    }
  };

  clearComment = () => this.setState({ comment: "" });

  checkLike = post => {
    const { user, addLike, delLike } = this.props;
    let like = post.likes.find(like => like.owner._id === user.id);
    like ? delLike(like._id, post._id) : addLike(post._id);
  };

  handleChange = event => this.setState({ comment: event.target.value });

  render() {
    const { post, likeFetching, user, commentFetching, fail } = this.props;
    return (
      <div className="wrap">
        {fail && <Redirect to="/page not found" />}
        {!post ? (
          <Preloader />
        ) : (
          <>
            <div className="post-conteiner">
              <div className="avatar-conteiner">
                {post.owner.avatar ? (
                  <img
                    src={url + post.owner.avatar.url}
                    className="avatar-posts"
                    alt="avatar"
                  />
                ) : (
                  <img src={avatar} className="avatar-posts" alt="avatar" />
                )}
              </div>
              <div className="post-context">
                <div className="nick-posts">
                  {post.owner.nick || post.owner.login}
                  <span className="createdAt-posts">
                    {formatDate(new Date(+post.createdAt).toLocaleDateString())}
                  </span>
                </div>
                {post.title ? (
                  <div className="title">{post.title}</div>
                ) : (
                  <div className="title">Title</div>
                )}
                {post.text ? (
                  <div className="card-text">{post.text}</div>
                ) : null}
                {post.images ? (
                  <div>
                    {" "}
                    {post.images.map(image => {
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
                      post.likes.some(like => like.owner._id === user.id)
                        ? "icon-heart like-button like-red"
                        : "icon-heart like-button like-white"
                    }
                    onClick={likeFetching ? null : () => this.checkLike(post)}
                  ></button>
                  <span className="like">{post.likes.length}</span>
                </div>
              </div>
            </div>
            {post.comments
              ? post.comments.map(comment => {
                  const { text, owner, createdAt, likes, _id } = comment;
                  return (
                    <Comment
                      key={_id}
                      id={_id}
                      text={text}
                      avatar={owner.avatar}
                      nick={owner.nick}
                      login={owner.login}
                      createdAt={createdAt}
                      likes={likes}
                      ownerID={owner._id}
                      postID={post._id}
                    />
                  );
                })
              : null}
            {commentFetching ? (
              <Preloader />
            ) : (
              <form
                className="add-comment-conteiner"
                onSubmit={event => this.submitComment(event)}
              >
                <input
                  className="input add-comment-input"
                  onChange={this.handleChange}
                  value={this.state.comment}
                />
                <button className="button">Add comment</button>
              </form>
            )}
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, postReducer }) => {
  return {
    user: userReducer.user,
    post: postReducer.post,
    commentFetching: postReducer.commentFetching,
    likeFetching: postReducer.likeFetching,
    fail: postReducer.fail
  };
};

export default connect(
  mapStateToProps,
  { addLike, delLike, getPost, addNewComment }
)(Post);
