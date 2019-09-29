import React, { Component } from "react";
import { connect } from "react-redux";
import "./style.css";

class Post extends Component {
  render() {
    const { posts, isFetching  } = this.props;
    const post = posts.find(x => x._id === this.props.match.params.id);

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
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.postsReduser.posts,
    isFetching: state.postsReduser.isFetching
  };
};

export default connect(mapStateToProps)(Post);
