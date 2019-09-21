import * as types from "../actionTypes";
import axios from "axios";
import { GraphQLClient } from 'graphql-request'

const qql = new GraphQLClient("/graphql", {headers: {}})
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

const userRequestLoginSuccess = payload => ({
  type: types.USER_REQUEST_LOGIN_SUCCESS,
  payload
});

const userRequestLoginFail = payload => ({
  type: types.USER_REQUEST_LOGIN_FAIL,
  payload
});

// export const userLogin = data => {
//   return async dispatch => {
//     dispatch(userRequestLogin());
//     try {
// 			const res = await axios({
// 				method: "POST",
// 				url: "/graphql",
// 				data
// 			})
//       console.log(res);
//     } catch (err) {
//       dispatch(userRequestLoginFail(err));
//     }
//   };
// };

export const userLogin = data => {
  return async dispatch => {
    dispatch(userRequestLogin());
    console.log(data)
    try {
    qql.request(`query login($login:String!, $password:String!){
      login(login:$login, password:$password)
    } `,{login: data.login, password: data.password})
    .then(data=> console.log(data))

    } catch (err) {
      dispatch(userRequestLoginFail(err));
    }
  };

}

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
