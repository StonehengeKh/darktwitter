import * as types from "../actionTypes";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { GraphQLClient } from "graphql-request";
import { getAllPosts } from "./posts";

export let gql;
export const checkToken = () => {
  if (localStorage.authToken) {
    return (gql = new GraphQLClient("/graphql", {
      headers: { Authorization: `Bearer ${localStorage.authToken}` }
    }));
  } else {
    return (gql = new GraphQLClient("/graphql", { headers: {} }));
  }
};
const url = "http://hipstagram.asmer.fs.a-level.com.ua/";

export const delUser = () => ({
  type: types.DEL_USER
});

const userRequestRegistr = () => ({
  type: types.USER_REQUEST_REGISTR
});

const userRequestRegistrSuccess = payload => ({
  type: types.USER_REQUEST_REGISTR_SUCCESS,
  payload
});

const userRequestRegistrFail = payload => ({
  type: types.USER_REQUEST_REGISTR_FAIL,
  payload
});

export const registration = data => {
  return async dispatch => {
    dispatch(userRequestRegistr());
    checkToken();
    const res = await gql.request(
      `mutation reg($login:String!, $password:String!){
            createUser(login:$login, password:$password){
              _id
            }
          }
           `,
      { login: data.login, password: data.password }
    );
    console.log(res.createUser);
    if (res.createUser) {
      dispatch(userLogin(data));
    } else dispatch(userRequestRegistrFail());
  };
};

const userRequestLogin = () => ({
  type: types.USER_REQUEST_LOGIN
});

// const userRequestLoginSuccess = payload => ({
//   type: types.USER_REQUEST_LOGIN_SUCCESS,
//   payload
// });

const userRequestLoginFail = payload => ({
  type: types.USER_REQUEST_LOGIN_FAIL,
  payload
});

export const userLogin = data => {
  return async dispatch => {
    dispatch(userRequestLogin());
    try {
      checkToken();
      const res = await gql.request(
        `query login($login:String!, $password:String!){
      login(login:$login, password:$password)
    } `,
        { login: data.login, password: data.password }
      );
      if (res.login) {
        localStorage.setItem("authToken", res.login);
        dispatch(tokenDecode());
      } else dispatch(userRequestLoginFail());
    } catch (err) {
      dispatch(userRequestLoginFail(err));
    }
  };
};

const addUser = payload => ({
  type: types.ADD_USER,
  payload
});

export const tokenDecode = () => {
  return dispatch => {
    let decoded = jwt_decode(localStorage.authToken);
    dispatch(addUser(decoded.sub));
    dispatch(getAllPosts());
  };
};

// export const getPost = () => {
//   return async dispatch => {
//     checkToken();
//     const res = await gql.request(
//       `query postAll{
//         PostFind(query: "[{}]"){
//           _id,
//           text,
//           title,
//           images{_id, url}
//           owner{_id},
//           likes{_id},
//           comments{
//             _id, text
//           }
//         }
//       } `
//     );
//     console.log(res);
//   };
// };

// export const userFindOne = id => {
//   return async dispatch => {
//     checkToken();
//     const res = await gql.request(
//       `query user($query:String!){
//         UserFindOne(query:$query){
//           _id, login, nick
//           likes{_id},
//           incomings{_id},
//           followers{_id},
//           following{_id}
//         }
//       }
//       `,
//      {query: JSON.stringify([{ _id: id }])}
//     );
//     console.log(res);
//   };
// };

export const userFindOne = id => {
  return async dispatch => {
    checkToken();
    const res = await gql.request(
      `query user{
        UserFind(query: "[{}]"){
          _id, login
        }
      }
      `,
      { query: JSON.stringify([{ _id: id }]) }
    );
    console.log(res);
  };
};

// export const UserUpsert = (id, nick) => {
//   return async dispatch => {
//     checkToken();
//     const res = await gql.request(
//       `mutation UserUpsert($user: UserInput){
//         UserUpsert(user: $user){
//           _id, login, nick
//         }
//       }
//       `,
//       { user: { _id: id, nick: nick } }
//     );
//     console.log(res);
//   };
// };

// export const userDel = id => {
//   return async dispatch => {
//     checkToken();
//     const res = await gql.request(
//       `mutation UserDelete($user: UserInput){
//         UserDelete(user: $user){
//           _id, login, nick
//         }
//       }
//       `,
//       { user: { _id: id } }
//     );
//     console.log(res);
//   };
// };
