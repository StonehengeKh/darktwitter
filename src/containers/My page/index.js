import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getAllMyPosts } from "../../actions/myposts";
import "./style.css";
import Preloader from "../../components/Preloader"

class MyPage extends Component {
  componentDidMount() {
    this.props.getAllMyPosts(this.props.user.id)
  }

  render() {
    const { isFetching, myPosts } = this.props;
    return (
      <div>
        {isFetching ? (
          <Preloader/>
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

const mapStateToProps = ({ userReducer, myPostsReducer }) => {
  return {
    user: userReducer.user,
    isFetching: myPostsReducer.isFetching,
    myPosts: myPostsReducer.myPosts
  };
};

export default connect(mapStateToProps, {getAllMyPosts})(MyPage);
