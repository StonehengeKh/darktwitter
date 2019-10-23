import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Header from "../../components/Header";
import { loadPosts } from "../../actions/posts";
import { loadUsers } from "../../actions/users";
import { connect } from "react-redux";
import TopSide from "../Topside";
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
      users,
      loadUserFail,
      user
    } = this.props;
    switch (location.pathname) {
      case "/":
        loadFail || loadPosts(user.following, posts.length);
        break;
      case "/users":
        loadUserFail || loadUsers(users.length);
        break;

      default:
        break;
    }
  };

  render() {
    const { children, loadFetching, loadUserFetching, user } = this.props;
    return (
      <div className="layout-block">
        {user && <Header />}

        <section
          className="layout-center"
          onScroll={
            loadFetching ? null : loadUserFetching ? null : e => this.scroll(e)
          }
        >
          {user && <TopSide />}
          <div className={localStorage.authToken ?  user  ? "layout-block-page": "layout-block-auth" : "layout-block-auth"}>{children}</div>
        </section>
        <div />
      </div>
    );
  }
}

const mapStateToProps = ({ postsReducer, usersReducer, userReducer }) => {
  return {
    posts: postsReducer.posts,
    loadFetching: postsReducer.loadFetching,
    loadFail: postsReducer.loadFail,
    users: usersReducer.users,
    loadUserFail: usersReducer.loadUserFail,
    loadUserFetching: usersReducer.loadUserFetching,
    user: userReducer.user
  };
};

export default connect(
  mapStateToProps,
  { loadPosts, loadUsers }
)(withRouter(Layout));
