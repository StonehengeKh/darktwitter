import * as types from "../actionTypes";

const initialState = {
  myPosts: [],
  isFetching: false,
  fail: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_ALL_MY_POSTS_REQUEST: {
      return { ...state, isFetching: true, fail: false };
    }
    case types.GET_ALL_MY_POSTS_REQUEST_SUCCESS: {
      return { ...state, isFetching: false, myPosts: payload };
    }
    case types.GET_ALL_MY_POSTS_REQUEST_FAIL: {
      return { ...state, isFetching: false, fail: true };
    }

    case types.CREATE_NEW_POST_REQUEST: {
      return { ...state, isFetching: true, fail: false };
    }
    case types.CREATE_NEW_POST_REQUEST_SUCCESS: {
      return { ...state, isFetching: false, myPosts: [payload, ...state.myPosts]  };
    }
    case types.CREATE_NEW_POST_REQUEST_FAIL: {
      return { ...state, isFetching: false, fail: true };
    }
    case types.REFRESH_MY_POST: {
      return{ ...state, myPosts: state.myPosts.map(post => post._id === payload._id ? payload : post)}
    }


    default: {
      return state;
    }
  }
};
