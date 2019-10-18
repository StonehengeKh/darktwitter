import * as types from "../actionTypes";

const initialState = {
  posts: [],
  isFetching: false,
  fail: false,
  likeFetching: false,
  loadFetching: false,
  loadFail: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_ALL_POSTS_REQUEST: {
      return { ...state, isFetching: true, fail: false };
    }
    case types.GET_ALL_POSTS_REQUEST_SUCCESS: {
      return { ...state, isFetching: false, posts: payload };
    }
    case types.GET_ALL_POSTS_REQUEST_FAIL: {
      return { ...state, isFetching: false, fail: true };
    }

    case types.ADD_LIKE_POSTS_REQUEST: {
      return { ...state, likefFetching: true };
    }
    case types.ADD_LIKE_POSTS_REQUEST_SUCCESS: {
      return {
        ...state,
        posts: state.posts.map(post => post._id === payload._id ? payload : post),
        likeFetching: false,
      };
    }

    case types.DEL_LIKE_POSTS_REQUEST: {
      return { ...state, likeFetching: true };
    }
    case types.DEL_LIKE_POSTS_REQUEST_SUCCESS: {
      return {
        ...state,
        posts: state.posts.map(post => post._id === payload._id ? payload : post),
        likeFetching: false,
      };
    }

    case types.LOAD_POSTS_REQUEST: {
      return { ...state, loadFetching: true, loadFail: false };
    }
    case types.LOAD_POSTS_REQUEST_SUCCESS: {
      return {
        ...state,
        loadFetching: false,
        posts: [...state.posts, ...payload]
      };
    }
    case types.LOAD_POSTS_REQUEST_FAIL: {
      return { ...state, loadFetching: false, loadFail: true };
    }

    default: {
      return state;
    }
  }
};
