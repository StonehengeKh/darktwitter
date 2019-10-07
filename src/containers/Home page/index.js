import React from "react";
import { connect } from "react-redux";
import { userFindOne } from "../../actions/user";
import { getAllPosts, loadPosts } from "../../actions/posts";
import { Card } from "../../components/Card";
import "./style.css";

class News extends React.Component {
  clicker = () => {
    const { getAllPosts } = this.props;
    getAllPosts();
  };

  // user = () => {
  //   const { userFindOne } = this.props;
  //   let id = "5d7cf2a28657825417878094";
  //   userFindOne(id);
  // };

  scroll = e => {
    let scrollBottom =
      e.target.scrollTop + e.target.offsetHeight > e.target.scrollHeight - 100;
    // console.log(
    //   e.target.scrollTop + e.target.offsetHeight,
    //   e.target.scrollHeight,
    //   scrollBottom
    // );
    if (scrollBottom) {
      this.loadContent();
    }
  };

  loadContent = () => {
    const { loadPosts, posts, loadFail } = this.props;
    let skip = posts.length;
    loadFail || loadPosts(skip);
  };

  render() {
    const { posts, isFetching, loadFetching } = this.props;
    return (
      <div className="all-posts">
        {isFetching ? (
          <div>Loading...</div>
        ) : (
          <div
            className="all-posts-wrapp"
            onScroll={loadFetching ? null : e => this.scroll(e)}
          >
            {posts
              ? posts.map(post => {
                  const {
                    title,
                    text,
                    images,
                    comments,
                    likes,
                    owner,
                    _id
                  } = post;
                  return (
                    <Card
                      title={title}
                      key={_id}
                      id={_id}
                      images={images}
                      text={text}
                    />
                  );
                })
              : null}
          </div>
        )}
        {loadFetching && <div>Loading...</div>}
      </div>
    );
  }
}

const mapStateToProps = ({ postsReduser }) => {
  return {
    posts: postsReduser.posts,
    isFetching: postsReduser.isFetching,
    loadFetching: postsReduser.loadFetching,
    loadFail: postsReduser.loadFail
  };
};

export default connect(
  mapStateToProps,
  { getAllPosts, userFindOne, loadPosts }
)(News);
