import React, { Component } from "react";
import { connect } from "react-redux";
import { addLike, delLike } from "../../actions/likes";
import "./style.css";

class Post extends Component {
  checkLike = post => {
    const { user, addLike, delLike } = this.props;
    let like = post.likes.find(like => like.owner._id === user.id);
    like ? delLike(like._id, post._id) : addLike(post._id);
    // refreshPost(post._id);
  };

  render() {
    const { posts, isFetching, likeFetching, user } = this.props;
    const post = posts.find(x => x._id === this.props.match.params.id);
    let check = post.likes.some(like => like.owner._id === user.id);
    return (
      <div className="wrap">
        {isFetching ? (
          <div>Loading...</div>
        ) : (
          <div className="context-rec">
            <p>{post.title}</p>
            <pre className="text-pre">
              <p className="text-span">{post.text}</p>
            </pre>
            {post.images
              ? post.images.map(image => {
                  return (
                    <img
                      key={image._id}
                      alt="img"
                      src={`http://hipstagram.asmer.fs.a-level.com.ua/${image.url}`}
                      className="img"
                    ></img>
                  );
                })
              : null}
            <button
              className={check ? "icon-heart like-button like-red" : "icon-heart like-button like-white"}
              onClick={likeFetching ? null : e => this.checkLike(post)}
            ></button>
            <span className="like">{post.likes.length}</span>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ userReduser, postsReduser }) => {
  return {
    user: userReduser.user,
    posts: postsReduser.posts,
    isFetching: postsReduser.isFetching,
    likeFetching: postsReduser.likeFetching
  };
};

export default connect(
  mapStateToProps,
  { addLike, delLike }
)(Post);
