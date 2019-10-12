import * as types from "../actionTypes";

const initialState = {
  posts: null,
  isFetching: false,
  fail: false,
  likeFetching: false,
  loadFetching: false,
  loadFail: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_ALL_POSTS_REQUEST: {
      return { ...state,  isFetching: true, fail: false };
    }
    case types.GET_ALL_POSTS_REQUEST_SUCCESS: {
      return { ...state, isFetching: false, posts: payload };
    }
    case types.GET_ALL_POSTS_REQUEST_FAIL: {
      return { ...state, isFetching: false, fail: true };
    }

    // case types.ADD_LIKE_REQUEST: {
    //   return { ...state, likefFetching: true };
    // }
    // case types.ADD_LIKE_REQUEST_SUCCESS: {
    //   const elem = state.posts.find(post => post._id === payload[1]);
    //   elem.likes = [...elem.likes, payload[0]];
    //   return {
    //     ...state,
    //     likeFetching: false,
    //     posts: [...state.posts, elem]
    //   };
		// }
		// case types.DEL_LIKE_REQUEST: {
    //   return { ...state, likeFetching: true };
    // }
    // case types.DEL_LIKE_REQUEST_SUCCESS: {
    //   const elem = state.posts.find(post => post._id === payload[1]);
		// 	elem.likes = elem.likes.filter(like=> like._id !== payload[0])
    //   return {
    //     ...state,
    //     likeFetching: false,
		// 		posts: [...state.posts, elem]
    //   };
    // }

    case types.LOAD_POSTS_REQUEST: {
      return { ...state, loadFetching: true,  loadFail: false };
    }
    case types.LOAD_POSTS_REQUEST_SUCCESS: {
      return { ...state, loadFetching: false, 
      posts: [...state.posts, ...payload]
      };
    }
    case types.LOAD_POSTS_REQUEST_FAIL: {
      return { ...state, loadFetching: false,  loadFail: true };
    }


    default: {
      return state;
    }
  }
};
