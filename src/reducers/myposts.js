import * as types from "../actionTypes";

const initialState = {
  myPosts: null,
  isFetching: false,
  fail: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_ALL_MY_POSTS_REQUEST: {
      return { ...state, posts: null, isFetching: true, fail: false };
    }
    case types.GET_ALL_MY_POSTS_REQUEST_SUCCESS: {
      return { ...state, isFetching: false, myPosts: payload };
    }
    case types.GET_ALL_MY_POSTS_REQUEST_FAIL: {
      return { ...state, isFetching: false, fail: true };
    }



    default: {
      return state;
    }
  }
};
