import * as types from "../actionTypes";
import { gql, checkToken } from "./user";

const getPostReguest = () => ({
  type: types.GET_POST_REQUEST
});

const getPostReguestSuccess = payload => ({
  type: types.GET_POST_REQUEST_SUCCESS,
  payload
});

const getPostReguestFail = () => ({
  type: types.GET_POST_REQUEST_FAIL
});

export const getPost = id => {
  return async dispatch => {
    dispatch(getPostReguest());
    checkToken();
    try {
      const res = await gql.request(
        `query post($query:String!){
          PostFindOne(query: $query){
            _id,
            text,
            title,
            images{_id, url}
            owner{_id, avatar{_id, url}, nick, login},
            likes{_id, owner{_id}},
            createdAt,
            comments{
              _id, 
              text, 
              owner{_id, avatar{_id, url}, nick, login },
              likes{_id, owner{_id}}
              createdAt,
              post{_id}
            }
          }
        } `,
        { query: JSON.stringify([{ _id: id }]) }
      );
      if (res.PostFindOne) {
        dispatch(getPostReguestSuccess(res.PostFindOne));
      } 
    } catch {
      dispatch(getPostReguestFail());
    }
  };
};

const addNewCommentRequest = () => ({
  type: types.ADD_NEW_COMMENT_REQUEST
});

const addNewCommentRequesttSuccess = payload => ({
  type: types.ADD_NEW_COMMENT_REQUEST_SUCCESS,
  payload
});
const addNewCommentRequestFail = () => ({
  type: types.ADD_NEW_COMMENT_REQUEST_FAIL
});

export const addNewComment = (data, id) => {
  return async dispatch => {
    dispatch(addNewCommentRequest());
    checkToken();
    const res = await gql.request(
      ` mutation newComment($comment:CommentInput){
        CommentUpsert(comment: $comment){
             _id, text
          }
         }`,
      { comment: { text: data.comment, post: { _id: id } } }
    );
    if (res.CommentUpsert) {
      const post = await gql.request(
        `query post($query:String!){
            PostFindOne(query: $query){
              comments{
                _id, 
                text, 
                owner{_id, avatar{_id, url}, nick, login },
                likes{_id, owner{_id}}
                createdAt
              }
            }
          } `,
        { query: JSON.stringify([{ _id: id }]) }
      );
      if (post.PostFindOne)
        dispatch(addNewCommentRequesttSuccess(post.PostFindOne.comments));
    } else {
      dispatch(addNewCommentRequestFail());
    }
  };
};

const editCommentRequest = () => ({
  type: types.EDIT_COMMENT_REQUEST
});

const editCommentRequestSuccess = payload => ({
  type: types.EDIT_COMMENT_REQUEST_SUCCESS,
  payload
});
const editCommentRequestFail = () => ({
  type: types.EDIT_COMMENT_REQUEST_FAIL
});

export const editComment = (textValue, commentid, id) => {
  return async dispatch => {
    dispatch(editCommentRequest());
    checkToken();
    const res = await gql.request(
      ` mutation newComment($comment:CommentInput){
        CommentUpsert(comment: $comment){
             _id, text
          }
         }`,
      { comment: { text: textValue, _id: commentid } }
    );
    if (res.CommentUpsert) {
      const post = await gql.request(
        `query post($query:String!){
            PostFindOne(query: $query){
              comments{
                _id, 
                text, 
                owner{_id, avatar{_id, url}, nick, login },
                likes{_id, owner{_id}}
                createdAt
              }
            }
          } `,
        { query: JSON.stringify([{ _id: id }]) }
      );
      if (post.PostFindOne)
        dispatch(editCommentRequestSuccess(post.PostFindOne.comments));
    } else {
      dispatch(editCommentRequestFail());
    }
  };
};

const addLikeCommentRequest = () => ({
  type: types.ADD_LIKE_COMMENT_REQUEST
});
const addLikeCommentRequestSuccess = payload => ({
  type: types.ADD_LIKE_COMMENT_REQUEST_SUCCESS,
  payload
});
const addLikeCommentRequestFail = () => ({
  type: types.ADD_LIKE_COMMENT_REQUEST_FAIL
});

export const addLikeComment = (commentId, postId) => {
  return async dispatch => {
    dispatch(addLikeCommentRequest());
    checkToken();
    const res = await gql.request(
      `mutation like($like: LikeInput){
        LikeUpsert(like: $like) {
              _id, owner{_id}
          }
        }`,
      { like: { comment: { _id: commentId } } }
    );
    if (res.LikeUpsert) {
      const post = await gql.request(
        `query post($query:String!){
            PostFindOne(query: $query){
              comments{
                _id, 
                text, 
                owner{_id, avatar{_id, url}, nick, login },
                likes{_id, owner{_id}}
                createdAt
              }
            }
          } `,
        { query: JSON.stringify([{ _id: postId }]) }
      );
      if (post.PostFindOne)
        dispatch(addLikeCommentRequestSuccess(post.PostFindOne.comments));
    } else {
      dispatch(addLikeCommentRequestFail());
    }
  };
};

const delLikeCommentRequest = () => ({
  type: types.DEL_LIKE_COMMENT_REQUEST
});
const delLikeCommentRequestSuccess = payload => ({
  type: types.DEL_LIKE_COMMENT_REQUEST_SUCCESS,
  payload
});
const delLikeCommentRequestFail = () => ({
  type: types.DEL_LIKE_COMMENT_REQUEST_FAIL
});

export const delLikeComment = (likeId, postId) => {
  return async dispatch => {
    dispatch(delLikeCommentRequest());
    checkToken();
    const res = await gql.request(
      `mutation like($like: LikeInput){
        LikeDelete(like: $like) {
              _id
          }
        }`,
      { like: { _id: likeId } }
    );
    if (res.LikeDelete) {
      const post = await gql.request(
        `query post($query:String!){
            PostFindOne(query: $query){
              comments{
                _id, 
                text, 
                owner{_id, avatar{_id, url}, nick, login },
                likes{_id, owner{_id}}
                createdAt
              }
            }
          } `,
        { query: JSON.stringify([{ _id: postId }]) }
      );
      if (post.PostFindOne)
        dispatch(delLikeCommentRequestSuccess(post.PostFindOne.comments));
    } else {
      dispatch(delLikeCommentRequestFail());
    }
  };
};
