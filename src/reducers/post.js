import * as types from "../actionTypes";

const initialState = {
  post: null,
  isFetching: false,
  fail: false,
  likeFetching: false
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
        likeFetching: false,
        post: {...state.post, likes:likes}
      };
		}

		case types.DEL_LIKE_REQUEST: {
      return { ...state, likeFetching: true };
    }
    case types.DEL_LIKE_REQUEST_SUCCESS: {
      
			const likes = state.post.likes.filter(like=> like._id !== payload[0])
      return {
        ...state,
        likeFetching: false,
				post: {...state.post, likes:likes}
      };
    }


    default: {
      return state;
    }
  }
};
