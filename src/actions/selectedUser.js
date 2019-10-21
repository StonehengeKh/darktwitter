import * as types from "../actionTypes";
import { gql, checkToken } from "./user";

const selectedUserRequest = () => ({
  type: types.SELECTED_USER_REQUEST
});

const selectedUserRequestSuccess = payload => ({
  type: types.SELECTED_USER_REQUEST_SUCCESS,
  payload
});

const selectedUserRequestFail = payload => ({
  type: types.SELECTED_USER_REQUEST_FAIL,
  payload
});

export const selectedUser = id => {
  return async dispatch => {
    dispatch(selectedUserRequest());
    checkToken();
    const user = await gql.request(
      `query user($query:String!){
        UserFindOne(query:$query){
          nick,
          _id,
          login,
          followers{_id, avatar{_id, url}, login, nick},
          following{_id, avatar{_id, url}, login, nick},
          avatar{_id, url}
        }
      }
      `,
      { query: JSON.stringify([{ _id: id }]) }
    );
    if (user.UserFindOne) {
      const posts = await gql.request(
        `query post($query:String!){
              PostFind(query: $query){
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
        { query: JSON.stringify([{ ___owner: id }, { sort: ["_id", -1] }]) }
      );
      if (posts.PostFind) {
        dispatch(
          selectedUserRequestSuccess([user.UserFindOne, posts.PostFind])
        );
      } else {
        dispatch(selectedUserRequestFail([user.UserFindOne, posts.PostFind]));
      }
    } else {
      dispatch(selectedUserRequestFail([user.UserFindOne, posts.PostFind]));
    }
  };
};
