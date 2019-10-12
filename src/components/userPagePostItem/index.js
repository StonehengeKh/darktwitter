import React from 'react';
import { connect } from "react-redux";
import {addLike, delLike} from '../../actions/likes'

const PostItem = ({post, user, addLike, delLike}) => {
   const checkLike = post => {
        let like = post.likes.find(like => like.owner._id === user.id);
        like ? delLike(like._id, post._id) : addLike(post._id);
        // refreshPost(post._id);
      };
    return(<div className="context-rec">
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
      className={post.likes.some(like => like.owner._id === user.id) ? "icon-heart like-button like-red" : "icon-heart like-button like-white"}
      onClick={() => checkLike(post)}
    ></button>
    <span className="like">{post.likes.length}</span>
  </div>)
}

export default connect(
    null,
    {addLike, delLike}
  )(PostItem);
  