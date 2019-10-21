import React from 'react';
import { connect } from "react-redux";
import { addLike, delLike } from '../../actions/likes'
import { getPost } from "../../actions/post";
import { getAllMyPosts } from "../../actions/myposts";


const PostItem = ({ post, user, addLike, delLike, getPost, getAllMyPosts, likeFetching, isFetching, postFetching }) => {
  const checkLike = async post => {
    if(!likeFetching && !isFetching && !postFetching){
      let like = post.likes.find(like => like.owner._id === user.id);
      console.log("like",like)
      await getPost(post._id)
      await like ? delLike(like._id, post._id) : addLike(post._id);
      await getAllMyPosts(user.id)
    }

  };
  return (<div className="context-rec">
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
    <button
      className={post.likes ? post.likes.some(like => like.owner._id === user.id)
        ? "icon-heart like-button like-red"
        : "icon-heart like-button like-white"
        : "icon-heart like-button like-white"}
      onClick={() => checkLike(post)}
    ></button>
    <span className="like">{post.likes ? post.likes.length : '0'}</span>
  </div>)
}
const mapStateToProps = ({postReduser, myPostsReduser}) => ({
  likeFetching: postReduser.likeFetching,
  isFetching: myPostsReduser.isFetching,
  postFetching: postReduser.isFetching
})

export default connect(
  mapStateToProps,
  { addLike, delLike, getPost, getAllMyPosts }
)(PostItem);
