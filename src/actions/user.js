import * as types from "../actionTypes";
import jwt_decode from "jwt-decode";
import { GraphQLClient } from "graphql-request";
// import { getAllPosts } from "./posts";
import { userFind } from "./users";
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



// const addUserSetingsRequest = () => ({
//   type: types.ADD_USER_SETINGS_REQUEST
// });

const addUserSetingsRequestSuccess = payload => ({
  type: types.ADD_USER_SETINGS_REQUEST_SUCCESS,
  payload
});

// const addUserSetingsRequestFail = ()=> ({
//   type: types.ADD_USER_SETINGS_REQUEST_FAIL,
// });



export const userFindOne = id => {
  return async dispatch => {
    // dispatch(addUserSetingsRequest());
    checkToken();
    const res = await gql.request(
      `query user($query:String!){
        UserFindOne(query:$query){
          nick
          followers{_id, avatar{_id, url}, login, nick},
          following{_id, avatar{_id, url}, login, nick},
          avatar{_id, url}
        }
      }
      `,
     {query: JSON.stringify([{ _id: id }])}
    );
    if (res.UserFindOne){
    dispatch(addUserSetingsRequestSuccess(res.UserFindOne));
    } 
    // else {
    //   dispatch(addUserSetingsRequestFail());
    // }
  };
};

const userUpsertNickReguest = () => ({
  type: types.USER_UPSERT_NICK_REQUEST
});

const userUpsertNickReguestSuccess = payload => ({
  type: types.USER_UPSERT_NICK_REQUEST_SUCCESS,
  payload
});

const userUpsertNickReguestFail = () => ({
  type: types.USER_UPSERT_NICK_REQUEST_FAIL
});


export const userUpsertNick = (id, nick) => {
  return async dispatch => {
    dispatch(userUpsertNickReguest());
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
      dispatch(userUpsertNickReguestSuccess(res.UserUpsert.nick));
    } else {
      dispatch(userUpsertNickReguestFail());
    }
  };
};

const userUpsertAvatarReguest = () => ({
  type: types.USER_UPSERT_AVATAR_REQUEST
});

const userUpsertAvatarReguestSuccess = payload => ({
  type: types.USER_UPSERT_AVATAR_REQUEST_SUCCESS,
  payload
});

const userUpsertAvatarkReguestFail = () => ({
  type: types.USER_UPSERT_AVATAR_REQUEST_FAIL
});


export const userUpsertAvatar = (id, imageId) => {
  return async dispatch => {
    dispatch(userUpsertAvatarReguest());
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
      dispatch(userUpsertAvatarReguestSuccess(res.UserUpsert.avatar));
    } else {
      dispatch(userUpsertAvatarkReguestFail());
    }
  };
};


const userUpsertFollowingReguest = () => ({
  type: types.USER_UPSERT_FOLLOWING_REQUEST
});

const userUpsertFollowingReguestSuccess = payload => ({
  type: types.USER_UPSERT_FOLLOWING_REQUEST_SUCCESS,
  payload
});

const userUpsertFollowingkReguestFail = () => ({
  type: types.USER_UPSERT_FOLLOWING_REQUEST_FAIL
});


export const userUpsertFollowing = (id, following) => {
  return async dispatch => {
    dispatch(userUpsertFollowingReguest());
    checkToken();
    const res = await gql.request(
      `mutation UserUpsert($user: UserInput){
        UserUpsert(user: $user){
          following{_id, avatar{_id, url}, login, nick}
        }
      }
      `,
      { user: { _id: id, following: following } }
    );
    if (res.UserUpsert.following) {
      dispatch(userUpsertFollowingReguestSuccess(res.UserUpsert.following));
    } else {
      dispatch(userUpsertFollowingkReguestFail());
    }
  };
};