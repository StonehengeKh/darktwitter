import React, { Component } from "react";
import { connect } from "react-redux";
import { addLike, delLike } from "../../actions/likes";
import "./style.css";
import { getPost } from "../../actions/post";
import avatar from "../../assets/img/smile.jpg";
import { url } from "../../actions/user";
import { formatDate } from "../../components/Card";

class Post extends Component {
  componentDidMount() {
    const { getPost } = this.props;
    getPost(this.props.match.params.id);
  }

  checkLike = post => {
    const { user, addLike, delLike } = this.props;
    let like = post.likes.find(like => like.owner._id === user.id);
    like ? delLike(like._id, post._id) : addLike(post._id);
    // refreshPost(post._id);
  };

  render() {
    const { post,likeFetching, user } = this.props;
    return (
      <div className="wrap">
        {!post ? (
          <div>Loading...</div>
        ) : (
          <div className="post-conteiner">
            <div className="avatar-conteiner">
              {post.avatar ? (
                <img
                  src={url + post.avatar.url}
                  className="avatar-posts"
                  alt="avatar"
                />
              ) : (
                <img src={avatar} className="avatar-posts" alt="avatar" />
              )}
            </div>
            <div>
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
              {post.text ? <div className="card-text">{post.text}</div> : null}
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
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ userReduser, postReduser }) => {
  return {
    user: userReduser.user,
    post: postReduser.post,
    // isFetching: postReduser.isFetching,
    likeFetching: postReduser.likeFetching
  };
};

export default connect(
  mapStateToProps,
  { addLike, delLike, getPost }
)(Post);
