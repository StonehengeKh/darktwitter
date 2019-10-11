import * as types from "../actionTypes";
import { gql, checkToken } from "./user";

const allUsers = payload => ({
  type: types.ALL_USERS,
  payload
});


export const userFind = id => {
  return async dispatch => {
    checkToken();
    const res = await gql.request(
      `query user($query:String!){
        UserFind(query: $query){
          _id, login, avatar{_id, url}
        }
      }
      `,
      { query: JSON.stringify([{}, { sort: ["_id", -1], limit: [20] }]) }
    );
    dispatch(allUsers(res.UserFind));
  };
};

const loadUsersReguest = () => ({
  type: types.LOAD_USERS_REQUEST
});

const loadUsersReguestSuccess = payload => ({
  type: types.LOAD_USERS_REQUEST_SUCCESS,
  payload
});

const loadUsersRuguestFail = () => ({
  type: types.LOAD_USERS_REQUEST_FAIL
});

export const loadUsers =  skip => {
  return async dispatch => {
    dispatch(loadUsersReguest());
    checkToken();
    const res = await gql.request(
      `query user($query:String!){
        UserFind(query: $query){
          _id, login, avatar{_id, url}
        }
      }
      `,
      { query: JSON.stringify([{}, { sort: ["_id", -1], limit: [20], skip: [skip] }]) }
    );
    if (res.UserFind.length > 0) {
      dispatch(loadUsersReguestSuccess(res.UserFind));
    } else {
      dispatch(loadUsersRuguestFail());
    }
  };
};