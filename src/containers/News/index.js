import React from "react";
import { connect } from "react-redux";

import { userFindOne } from "../../actions/user";
import { getAllPosts } from "../../actions/posts";
import { Card } from "../../components/Card"
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

  render() {
    const { posts, isFetching} = this.props;
    return (
      <div className="all_posts">
        {isFetching ? (
          <div>Loading...</div>
        ) : (
        <div className="all-posts-wrapp">
        { posts ? posts.map( post=> {
          const {title, text, images , comments, likes, owner, _id } = post
          return  <Card title={title} key={_id} id={_id} images={images} text={text}/>
        }
          ) : null}
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

export default connect(
  mapStateToProps,
  { getAllPosts, userFindOne }
)(News);
