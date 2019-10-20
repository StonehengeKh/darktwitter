import * as types from "../actionTypes";

const initialState = {
  post: null,
  isFetching: false,
  fail: false,
  likeFetching: false,
  commentFetching: false,
  LCFetching: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_POST_REQUEST: {
      return { ...state,  isFetching: true, fail: false };
    }
    case types.GET_POST_REQUEST_SUCCESS: {
      return { ...state, isFetching: false, post: payload };
    }
    case types.GET_POST_REQUEST_FAIL: {
      return { ...state, isFetching: false, fail: true };
    }

    case types.ADD_LIKE_REQUEST: {
      return { ...state, likefFetching: true };
    }
    case types.ADD_LIKE_REQUEST_SUCCESS: {
      const likes = [...state.post.likes, payload[0]];
      return {
        ...state,
        post: {...state.post, likes:likes},
        likeFetching: false
      };
		}

		case types.DEL_LIKE_REQUEST: {
      return { ...state, likeFetching: true };
    }
    case types.DEL_LIKE_REQUEST_SUCCESS: {
			const likes = state.post.likes.filter(like=> like._id !== payload[0])
      return {
        ...state,
        post: {...state.post, likes:likes},
        likeFetching: false
      };
    }

    case types.ADD_NEW_COMMENT_REQUEST: {
      return { ...state,  commentFetching: true};
    }
    case types.ADD_NEW_COMMENT_REQUEST_SUCCESS: {
      return { ...state, commentFetching: false, post: {...state.post, comments: payload} };
    }
    case types.ADD_NEW_COMMENT_REQUEST_FAIL: {
      return { ...state, commentFetching: false};
    }

    case types.EDIT_COMMENT_REQUEST: {
      return { ...state,  commentFetching: true};
    }
    case types.EDIT_COMMENT_REQUEST_SUCCESS: {
      return { ...state, commentFetching: false, post: {...state.post, comments: payload} };
    }
    case types.EDIT_COMMENT_REQUEST_FAIL: {
      return { ...state, commentFetching: false};
    }


    case types.ADD_LIKE_COMMENT_REQUEST: {
      return { ...state,  LCFetching: true};
    }
    case types.ADD_LIKE_COMMENT_REQUEST_SUCCESS: {
      return { ...state,post: {...state.post, comments: payload}, LCFetching: false };
    }
    case types.ADD_LIKE_COMMENT_REQUEST_FAIL: {
      return { ...state, LCFetching: false};
    }

    case types.DEL_LIKE_COMMENT_REQUEST: {
      return { ...state,  LCFetching: true};
    }
    case types.DEL_LIKE_COMMENT_REQUEST_SUCCESS: {
      return { ...state, post: {...state.post, comments: payload}, LCFetching: false };
    }
    case types.DEL_LIKE_COMMENT_REQUEST_FAIL: {
      return { ...state, LCFetching: false};
    }

    default: {
      return state;
    }
  }
};
