import * as types from "../actionTypes";
import jwt_decode from "jwt-decode";
import { GraphQLClient } from "graphql-request";
// import { getAllPosts } from "./posts";
import { userFind } from "./folowing";
export const url = "http://hipstagram.asmer.fs.a-level.com.ua/";

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

export const delUser = () => ({
  type: types.DEL_USER
});

const userRequestRegistr = () => ({
  type: types.USER_REQUEST_REGISTR
});

// const userRequestRegistrSuccess = payload => ({
//   type: types.USER_REQUEST_REGISTR_SUCCESS,
//   payload
// });

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
    // dispatch(getAllPosts());
    dispatch(userFind());
    dispatch(userFindOne(decoded.sub.id));
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

const addUserSetings = payload => ({
  type: types.ADD_USER_SETINGS,
  payload
});

export const userFindOne = id => {
  return async dispatch => {
    checkToken();
    const res = await gql.request(
      `query user($query:String!){
        UserFindOne(query:$query){
          nick
          followers{_id},
          following{_id},
          avatar{_id, url}
        }
      }
      `,
     {query: JSON.stringify([{ _id: id }])}
    );
    dispatch(addUserSetings(res.UserFindOne));
  };
};

const UserUpsertNickReguest = () => ({
  type: types.USER_UPSERT_NICK_REQUEST
});

const UserUpsertNickReguestSuccess = payload => ({
  type: types.USER_UPSERT_NICK_REQUEST_SUCCESS,
  payload
});

const UserUpsertNickReguestFail = () => ({
  type: types.USER_UPSERT_NICK_REQUEST_FAIL
});


export const UserUpsertNick = (id, nick) => {
  return async dispatch => {
    dispatch(UserUpsertNickReguest());
    checkToken();
    const res = await gql.request(
      `mutation UserUpsert($user: UserInput){
        UserUpsert(user: $user){
          nick
        }
      }
      `,
      { user: { _id: id, nick: nick } }
    );
    if (res.UserUpsert.nick) {
      dispatch(UserUpsertNickReguestSuccess(res.UserUpsert.nick));
    } else {
      dispatch(UserUpsertNickReguestFail());
    }
  };
};

const UserUpsertAvatarReguest = () => ({
  type: types.USER_UPSERT_AVATAR_REQUEST
});

const UserUpsertAvatarReguestSuccess = payload => ({
  type: types.USER_UPSERT_AVATAR_REQUEST_SUCCESS,
  payload
});

const UserUpsertAvatarkReguestFail = () => ({
  type: types.USER_UPSERT_AVATAR_REQUEST_FAIL
});


export const UserUpsertAvatar = (id, imageId) => {
  return async dispatch => {
    dispatch(UserUpsertAvatarReguest());
    checkToken();
    const res = await gql.request(
      `mutation UserUpsert($user: UserInput){
        UserUpsert(user: $user){
          avatar{_id, url}
        }
      }
      `,
      { user: { _id: id, avatar:{_id:imageId}} }
    );
    if (res.UserUpsert.avatar) {
      dispatch(UserUpsertAvatarReguestSuccess(res.UserUpsert.avatar));
    } else {
      dispatch(UserUpsertAvatarkReguestFail());
    }
  };
};

