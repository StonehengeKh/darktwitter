import * as types from "../actionTypes";
import axios from "axios";
import jwt_decode from 'jwt-decode';
import { GraphQLClient } from "graphql-request";

export let gql
export const  checkToken = () => {
  if (localStorage.authToken) {
    return (gql = new GraphQLClient("/graphql", {
      headers: { Authorization: `Bearer ${localStorage.authToken}` }
    }));
  } else {
    return (gql = new GraphQLClient("/graphql", { headers: {} }));
  }
}
// const qql = new GraphQLClient("/graphql", { headers: {} });
const url = "http://hipstagram.asmer.fs.a-level.com.ua/";

// qql = new GraphQLClient("/graphql", { headers: {Authorization: `Bearer ${localStorage.authToken}`} });

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
    try {
      const res = await axios.get(url);
      const user = res.data.some(
        x => x.email.toLowerCase() === data.email.toLowerCase()
      );
      if (user) {
        dispatch(userRequestRegistrFail());
      } else {
        try {
          const post = await axios.post(url, data);
          localStorage.setItem("email", post.data.email);
          dispatch(userRequestRegistrSuccess(post));
        } catch (err) {
          dispatch(userRequestRegistrFail(err));
        }
      }
    } catch (err) {
      dispatch(userRequestRegistrFail(err));
    }
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

const userRequestAuthorization = () => ({
  type: types.USER_REQUEST_AUTHORIZATION
});

const userRequestAuthorizationSuccess = payload => ({
  type: types.USER_REQUEST_AUTHORIZATION_SUCCESS,
  payload
});

const userRequestAuthorizationLoginFail = payload => ({
  type: types.USER_REQUEST_AUTHORIZATION_FAIL,
  payload
});

export const authorization = data => {
  return async dispatch => {
    dispatch(userRequestAuthorization());
    try {
      const res = await axios.get(url);
      const user = res.data.find(
        x => x.email.toLowerCase() === data.toLowerCase()
      );
      if (user) {
        dispatch(userRequestAuthorizationSuccess(user));
      } else dispatch(userRequestAuthorizationLoginFail());
    } catch (err) {
      dispatch(userRequestAuthorizationLoginFail(err));
    }
  };
};

export const updateUser = (name, payload) => ({
  type: types.UPDATE_USER,
  name,
  payload
});

export const setUserToUpdate = () => ({
  type: types.SET_USER_TO_UPDATE
});

const updateUserSaveRequest = () => ({
  type: types.UPDATE_USER_SAVE_REQUEST
});

const updateUserSaveRequestSuccess = payload => ({
  type: types.UPDATE_USER_SAVE_REQUEST_SUCCESS,
  payload
});

const updateUserSaveRequestFail = payload => ({
  type: types.UPDATE_USER_SAVE_REQUEST_FAIL,
  payload
});

export const updateUserSave = (id, data, email) => {
  return async dispatch => {
    dispatch(updateUserSaveRequest());
    try {
      if (data.email === email) {
        const post = await axios.patch(`${url}/${id}`, data);
        localStorage.setItem("email", post.data.email);
        dispatch(updateUserSaveRequestSuccess(post.data));
      } else {
        const res = await axios.get(url);
        const user = res.data.some(
          x => x.email.toLowerCase() === data.email.toLowerCase()
        );
        if (user) {
          dispatch(updateUserSaveRequestFail());
        } else {
          try {
            const post = await axios.patch(`${url}/${id}`, data);
            localStorage.setItem("email", post.data.email);
            dispatch(updateUserSaveRequestSuccess(post.data));
          } catch (err) {
            dispatch(updateUserSaveRequestFail(err));
          }
        }
      }
    } catch (err) {
      dispatch(updateUserSaveRequestFail(err));
    }
  };
};

const addUser = payload => ({
  type: types.ADD_USER,
  payload
});

export const tokenDecode =() =>{
  return dispatch => {
    let decoded = jwt_decode(localStorage.authToken);
    dispatch(addUser(decoded.sub));

  }
}

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
