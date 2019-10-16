import React, { Component } from "react";
import { connect } from "react-redux";
import { addLike, delLike } from "../../actions/likes";
import "./style.css";
import { getPost } from "../../actions/post";

class Post extends Component {

  componentDidMount(){
    const {getPost} = this.props
    getPost(this.props.match.params.id)
  }


  checkLike = post => {
    const { user, addLike, delLike } = this.props;
    let like = post.likes.find(like => like.owner._id === user.id);
    like ? delLike(like._id, post._id) : addLike(post._id);
    // refreshPost(post._id);
  };

  render() {
    const { post, isFetching, likeFetching, user} = this.props;
    return (
      <div className="wrap">
        {!post ? (
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
                    />
                  );
                })
              : null}
            <button
              className={post.likes.some(like => like.owner._id === user.id) ? "icon-heart like-button like-red" : "icon-heart like-button like-white"}
              onClick={likeFetching ? null : e => this.checkLike(post)}
            ></button>
            <span className="like">{post.likes.length}</span>
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
    isFetching: postReduser.isFetching,
    likeFetching: postReduser.likeFetching
  };
};

export default connect(
  mapStateToProps,
  { addLike, delLike, getPost }
)(Post);
