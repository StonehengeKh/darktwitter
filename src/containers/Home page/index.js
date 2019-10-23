import React from "react";
import { connect } from "react-redux";
// import { userFindOne } from "../../actions/user";
import { getAllPosts, loadPosts } from "../../actions/posts";
import Preloader from "../../components/Preloader";
import Card from "../../components/Card";
import "./style.css";

class HomePage extends React.Component {
  componentDidMount() {
    const { getAllPosts, user } = this.props;
    getAllPosts(user.following);
  }

  // scroll = e => {
  //   let scrollBottom =
  //     e.target.scrollTop + e.target.offsetHeight > e.target.scrollHeight - 150;
  //   if (scrollBottom) {
  //     this.loadContent();
  //   }
  // };

  loadContent = () => {
    const { loadPosts, posts, loadFail } = this.props;
    let skip = posts.length;
    loadFail || loadPosts(skip);
  };

  render() {
    const { posts, isFetching, loadFetching, loadFail } = this.props;
    return (
      <div className="all-posts">
        {isFetching ? (
          <Preloader />
        ) : (
          <div className="all-posts-wrapp">
            {posts
              ? posts.map(post => {
                  const {
                    title,
                    text,
                    images,
                    owner,
                    createdAt,
                    comments,
                    likes,
                    _id
                  } = post;
                  return (
                    <Card
                      title={title}
                      key={_id}
                      id={_id}
                      images={images}
                      text={text}
                      avatar={owner.avatar}
                      nick={owner.nick}
                      login={owner.login}
                      createdAt={createdAt}
                      comments={comments}
                      likes={likes}
                      ownerId={owner._id}
                    />
                  );
                })
              : null}
          </div>
        )}
        {loadFetching && <Preloader />}
      </div>
    );
  }
}

const mapStateToProps = ({ postsReducer, userReducer }) => {
  return {
    posts: postsReducer.posts,
    isFetching: postsReducer.isFetching,
    loadFetching: postsReducer.loadFetching,
    loadFail: postsReducer.loadFail,
    user: userReducer.user
  };
};

export default connect(
  mapStateToProps,
  { getAllPosts, loadPosts }
)(HomePage);
