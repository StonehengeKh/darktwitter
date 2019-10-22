import * as types from "../actionTypes";
import { gql, checkToken } from "./user";


const searchPostsRequest = () => ({
  type: types.SEARCH_POSTS_REQUEST
});

const searchPostsRequestSuccess = payload => ({
  type: types.SEARCH_POSTS_REQUEST_SUCCESS,
  payload
});

const searchPostsRequestFail = () => ({
  type: types.SEARCH_POSTS_REQUEST_FAIL
});

export const searchPosts = payload => {
  return async dispatch => {
    dispatch(searchPostsRequest());
    checkToken();
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
      { query: JSON.stringify([{title: payload }, { sort: ["_id", -1] }]) }
    );
    if (res.PostFind.length > 0) {
      dispatch(searchPostsRequestSuccess(res.PostFind));
    } else {
      dispatch(searchPostsRequestFail());
    }
  };
};


const searchUserRequest = () => ({
  type: types.SEARCH_USER_REQUEST
});

const searchUserRequestSuccess = payload => ({
  type: types.SEARCH_USER_REQUEST_SUCCESS,
  payload
});

const searchUserRequestFail = () => ({
  type: types.SEARCH_USER_REQUEST_FAIL
});

export const searchUser = payload => {
  return async dispatch => {
    dispatch(searchUserRequest());
    checkToken();
    const res = await gql.request(
      `query user($query:String!){
        UserFindOne(query:$query){
          nick,
          login,
          followers{_id, avatar{_id, url}, login, nick},
          following{_id, avatar{_id, url}, login, nick},
          avatar{_id, url}
        }
      }
      `,
     {query: JSON.stringify([{ login: payload }])}
    );
    if (res.UserFindOne) {
      dispatch(searchUserRequestSuccess(res.UserFindOne));
    } else {
      dispatch(searchUserRequestFail());
    }
  };
};