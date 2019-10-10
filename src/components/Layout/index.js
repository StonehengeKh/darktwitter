import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Header from "../../components/Header";
import { loadPosts } from "../../actions/posts";
import { loadUsers } from "../../actions/folowing";
import { connect } from "react-redux";
import "./Layout.css";

class Layout extends Component {
  scroll = e => {
    let scrollBottom =
      e.target.scrollTop + e.target.offsetHeight > e.target.scrollHeight - 150;
    if (scrollBottom) {
      this.loadContent();
    }
  };
  loadContent = () => {
    const {
      location,
      posts,
      loadFail,
      loadPosts,
      loadUsers,
      following,
      loadUserFail
    } = this.props;
    let skipPost = posts.length;
    let skipFollowing = following.length;
    switch (location.pathname) {
      case "/":
        loadFail || loadPosts(skipPost);
        break;
      case "/following":
        loadUserFail || loadUsers(skipFollowing);
        break;

      default:
        break;
    }
  };

  render() {
    const { children, loadFetching, loadUserFetching } = this.props;
    return (
      <div className="layout-block">
        <div
          className="layout-block-page"
          onScroll={
            loadFetching ? null : loadUserFetching ? null : e => this.scroll(e)
          }
        >
          <Header />
          {children}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ postsReduser, folowingReduser }) => {
  return {
    posts: postsReduser.posts,
    loadFetching: postsReduser.loadFetching,
    loadFail: postsReduser.loadFail,
    following: folowingReduser.following,
    loadUserFail: folowingReduser.loadUserFail,
    loadUserFetching: folowingReduser.loadUserFetching
  };
};

export default connect(
  mapStateToProps,
  { loadPosts, loadUsers }
)(withRouter(Layout));
