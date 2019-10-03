import React, { Component } from "react";
import { connect } from "react-redux";
import { addLike } from "../../actions/likes"
import "./style.css";

class Post extends Component {

checkLike = post => {
  const {user, addLike} = this.props
  let check = post.likes.some(like => like.owner._id === user.id)
 console.log(check)
 check ?  console.log(check) : addLike(post._id)
}

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
              <button className="icon-plus like-button" onClick={e=>this.checkLike(post)}></button><span className="like">{post.likes.length}</span>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userReduser.user,
    posts: state.postsReduser.posts,
    isFetching: state.postsReduser.isFetching
  };
};

export default connect(mapStateToProps, { addLike })(Post);
