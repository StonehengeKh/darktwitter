import * as types from "../actionTypes";
import { gql, checkToken } from "./user";

const addLikeReguest = () => ({
  type: types.ADD_LIKE_REQUEST
});

const addLikeReguestSuccess = payload => ({
  type: types.ADD_LIKE_REQUEST_SUCCESS,
  payload
});

export const addLike = id => {
  return async dispatch => {
    dispatch(addLikeReguest());
    checkToken();
    const res = await gql.request(
      `mutation like($like: LikeInput){
                 LikeUpsert(like: $like) {
                 			_id, owner{_id}
                   }
                 }`,
      { like: { post: { _id: id } } }
    );
    if (res.LikeUpsert) {
      dispatch(addLikeReguestSuccess([res.LikeUpsert, id]));
    }
  };
};
const delLikeReguest = () => ({
  type: types.DEL_LIKE_REQUEST
});

const delLikeReguestSuccess = payload => ({
  type: types.DEL_LIKE_REQUEST_SUCCESS,
  payload
});

export const delLike = (id, postid) => {
  return async dispatch => {
    dispatch(delLikeReguest());
    checkToken();
    const res = await gql.request(
      `mutation like($like: LikeInput){
              LikeDelete(like: $like) {
                    _id
                }
              }`,
      { like: { _id: id } }
    );
    if (res.LikeDelete) {
      dispatch(delLikeReguestSuccess([res.LikeDelete._id, postid]));
    }
  };
};

//  const refreshPostReguest = () => ({
//   type: types.GET_ALL_POSTS_REQUEST
// });

// const refreshPostReguestSuccess = payload => ({
//   type: types.GET_ALL_POSTS_REQUEST_SUCCESS,
//   payload
// });

// export const refreshPost = (id) => {
//   return async dispatch => {
//     dispatch( refreshPostReguest());
//       checkToken();
//       const res = await gql.request(
//         `query postAll($query:String!){
//           PostFindOne(query: $query){
//             _id,
//             text,
//             title,
//             images{_id, url}
//             owner{_id},
//             likes{_id, owner{_id}},
//             comments{
//               _id, text
//             }
//           }
//         } `,
//         {query: JSON.stringify([{ _id: id }])}
//       );
//       dispatch(refreshPostReguestSuccess(res.PostFindOne));
//   };
// };

const addLikePostsReguest = () => ({
  type: types.ADD_LIKE_POSTS_REQUEST
});

const addLikePostsReguestSuccess = payload => ({
  type: types.ADD_LIKE_POSTS_REQUEST_SUCCESS,
  payload
});

export const addLikePosts = id => {
  return async dispatch => {
    dispatch(addLikePostsReguest());
    checkToken();
    const res = await gql.request(
      `mutation like($like: LikeInput){
                 LikeUpsert(like: $like) {
                 			_id
                   }
                 }`,
      { like: { post: { _id: id } } }
    );
    if (res.LikeUpsert) {
      const newPost = await gql.request(
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
                _id, text
              }
            }
          } `,
        { query: JSON.stringify([{ _id: id }]) }
      );
      if (newPost.PostFindOne) {
        dispatch(addLikePostsReguestSuccess(newPost.PostFindOne));
      }
    }
  };
};
const delLikePostsReguest = () => ({
  type: types.DEL_LIKE_POSTS_REQUEST
});

const delLikePostsReguestSuccess = payload => ({
  type: types.DEL_LIKE_POSTS_REQUEST_SUCCESS,
  payload
});

export const delLikePosts = (id, postid) => {
  return async dispatch => {
    dispatch(delLikePostsReguest());
    checkToken();
    const res = await gql.request(
      `mutation like($like: LikeInput){
              LikeDelete(like: $like) {
                    _id
                }
              }`,
      { like: { _id: id } }
    );
    if (res.LikeDelete) {
      const newPost = await gql.request(
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
                _id, text
              }
            }
          } `,
        { query: JSON.stringify([{ _id: postid }]) }
      );
      if (newPost.PostFindOne) {
        dispatch(delLikePostsReguestSuccess(newPost.PostFindOne));
      }
    }
  };
};
