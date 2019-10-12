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

export const getAllPosts = () => {
  return async dispatch => {
    dispatch(getAllPostsReguest());
    checkToken();
    const res = await gql.request(
      `query postAll($query:String!){
          PostFind(query: $query){
            _id,
            text,
            title,
            images{_id, url}
            owner{_id},
            likes{_id, owner{_id}},
            comments{
              _id, text
            }
          }
        } `,
      // { query: JSON.stringify([{}, { sort: ["_id", -1] }]) }
      { query: JSON.stringify([{}, { sort: ["_id", -1], limit: [10] }]) }
    );
    if (res.PostFind) {
      dispatch(getAllPostsReguestSuccess(res.PostFind));
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

export const loadPosts =  skip => {
  return async dispatch => {
    dispatch(loadPostsReguest());
    checkToken();
    const res = await gql.request(
      `query postAll($query:String!){
          PostFind(query: $query){
            _id,
            text,
            title,
            images{_id, url}
            owner{_id},
            likes{_id, owner{_id}},
            comments{
              _id, text
            }
          }
        } `,
      { query: JSON.stringify([{}, { sort: ["_id", -1], limit: [10], skip: [skip] }]) }
    );
    if (res.PostFind.length > 0) {
      dispatch(loadPostsReguestSuccess(res.PostFind));
    } else {
      dispatch(loadPostsRuguestFail());
    }
  };
};