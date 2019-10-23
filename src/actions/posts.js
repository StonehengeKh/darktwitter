import * as types from "../actionTypes";
import { gql, checkToken } from "./user";

const getAllPostsReguest = () => ({
  type: types.GET_ALL_POSTS_REQUEST
});

const getAllPostsReguestSuccess = payload => ({
  type: types.GET_ALL_POSTS_REQUEST_SUCCESS,
  payload
});

const getAllPostsRuguestFail = () => ({
  type: types.GET_ALL_POSTS_REQUEST_FAIL
});

export const getAllPosts = following => {
  return async dispatch => {
    dispatch(getAllPostsReguest());
    checkToken();
    if (following) {
      const res = await gql.request(
        `query postAll($query:String!){
          PostFind(query: $query){
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
        {
          query: JSON.stringify([
            { ___owner: { $in: following.map(user => user._id) } },
            { sort: ["_id", -1], limit: [8] }
          ])
        }
        // { query: JSON.stringify([{}, { sort: ["_id", -1], limit: [8] }]) }
      );
      if (res.PostFind) {
        dispatch(getAllPostsReguestSuccess(res.PostFind));
      } else {
        dispatch(getAllPostsRuguestFail());
      }
    } else {
      dispatch(getAllPostsRuguestFail());
    }
  };
};

const loadPostsReguest = () => ({
  type: types.LOAD_POSTS_REQUEST
});

const loadPostsReguestSuccess = payload => ({
  type: types.LOAD_POSTS_REQUEST_SUCCESS,
  payload
});

const loadPostsRuguestFail = () => ({
  type: types.LOAD_POSTS_REQUEST_FAIL
});

export const loadPosts = (following, skip) => {
  return async dispatch => {
    dispatch(loadPostsReguest());
    checkToken();
    if (following) {
      const res = await gql.request(
        `query postAll($query:String!){
          PostFind(query: $query){
            _id,
            text,
            title,
            images{_id, url}
            owner{_id, avatar{_id, url}, nick, login},
            likes{_id, owner{_id}},
            createdAt,
            comments{
              _id
            }
          }
        } `,
        {
          query: JSON.stringify([
            { ___owner: { $in: following.map(user => user._id) } },
            { sort: ["_id", -1], limit: [8], skip: [skip] }
          ])
        }
        // { query: JSON.stringify([{}, { sort: ["_id", -1], limit: [8], skip: [skip] }]) }
      );
      if (res.PostFind.length > 0) {
        dispatch(loadPostsReguestSuccess(res.PostFind));
      } else {
        dispatch(loadPostsRuguestFail());
      }
    } else {
      dispatch(loadPostsRuguestFail());
    }
  };
};
