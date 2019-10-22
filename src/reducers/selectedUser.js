import * as types from "../actionTypes";

const initialState = {
  selectedUser: null,
  selectedUsersPosts: [],
  isFetching: false,
  fail: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SELECTED_USER_REQUEST: {
      return { ...state,  isFetching: true,   fail: false};
    }
    case types.SELECTED_USER_REQUEST_SUCCESS: {
      return { ...state, isFetching: false, selectedUser: payload[0], selectedUsersPosts: payload[1]  };
    }
    case types.DELETE_SELECTED_USER: {
      return {...initialState}
    }
    case types.SELECTED_USER_REQUEST_FAIL: {
      return { ...state, isFetching: false, fail: true };
    }

    case types.ADD_LIKE_POSTS_REQUEST_SUCCESS:
    case types.DEL_LIKE_POSTS_REQUEST_SUCCESS: {
      return { ...state, selectedUsersPosts: state.selectedUsersPosts.map(post => post._id === payload._id ? payload : post) };

    }


    default: {
      return state;
    }
  }
};
