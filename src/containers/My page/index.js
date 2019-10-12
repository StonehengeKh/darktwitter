import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./style.css";

class MyPage extends Component {


  render() {
    const { isFetching, myPosts} = this.props;
    return (
      <div>
        {isFetching ? (
          <div>Loading...</div>
        ) : (
          <>
            {myPosts &&
              myPosts.map(post => (
                <p key={post._id}>
                  <Link to={`/post/${post._id}`}> {post.title}</Link>
                </p>
              ))}
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({userReduser, myPostsReduser}) => {
  return {
    user: userReduser.user,
    isFetching: myPostsReduser.isFetching,
    myPosts: myPostsReduser.myPosts
  };
};

export default connect(
  mapStateToProps,
)(MyPage);
