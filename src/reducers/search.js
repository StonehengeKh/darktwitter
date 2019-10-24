import * as types from "../actionTypes";

const initialState = {
  posts: [],
  userS: null,
  isFetching: false,
  postsFail: false,
  userFail: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SEARCH_POSTS_REQUEST: {
      return {
        ...state,
        isFetching: true,
        postsFail: false,
        userS: null,
        posts: []
      };
    }
    case types.SEARCH_POSTS_REQUEST_SUCCESS: {
      return { ...state, isFetching: false, posts: payload };
    }
    case types.SEARCH_POSTS_REQUEST_FAIL: {
      return { ...state, isFetching: false, postsFail: true };
    }

    case types.SEARCH_USER_REQUEST: {
      return {
        ...state,
        isFetching: true,
        userFail: false,
        userS: null,
        posts: []
      };
    }
    case types.SEARCH_USER_REQUEST_SUCCESS: {
      return { ...state, isFetching: false, userS: payload };
    }
    case types.SEARCH_USER_REQUEST_FAIL: {
      return { ...state, isFetching: false, userFail: true };
    }
    case types.DEL_SEARCH: {
      return { ...state, posts: [], userS: null };
    }

    default: {
      return state;
    }
  }
};
