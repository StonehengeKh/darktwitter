import * as types from "../actionTypes";

const initialState = {
	following: null,
	isFetching: false,
  loadUserFail: false,
  loadUserFetching: false
}



export default (state = initialState, { type, payload }) => {
	switch (type) {

		case types.ALL_USERS: {
			return { ...state, following: payload, isFetching: false };
		}

    case types.LOAD_USERS_REQUEST: {
      return { ...state, loadUserFetching: true,  loadUserFail: false };
    }
    case types.LOAD_USERS_REQUEST_SUCCESS: {
      return { ...state, loadUserFetching: false, 
        following: [...state.following, ...payload]
      };
    }
    case types.LOAD_USERS_REQUEST_FAIL: {
      return { ...state, loadUserFetching: false,  loadUserFail: true };
    }


    default: {
			return state;
		}
	}
};