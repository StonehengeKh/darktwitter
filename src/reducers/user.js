import * as types from "../actionTypes";

const initialState = {
	user: null,
	isFetching: false,
	incorected: false,
}


export default (state = initialState, { type, name, payload }) => {
	switch (type) {

		case types.USER_REQUEST_REGISTR: {
			return { ...state, isFetching: true, mailExists: false };
		}
		case types.USER_REQUEST_REGISTR_SUCCESS: {
			return { ...state, isFetching: false, user: payload.data };
		}
		case types.USER_REQUEST_REGISTR_FAIL: {
			return { ...state, isFetching: false, mailExists: true };
		}

		case types.USER_REQUEST_LOGIN: {
			return { ...state, user: null, isFetching: true, incorected: false };
		}
		case types.USER_REQUEST_LOGIN_FAIL: {
			return { ...state, isFetching: false, incorected: true };
		}

		case types.DEL_USER: {
			return { ...state, user: null };
		}

		case types.ADD_USER: {
			return { ...state, user:{id: payload.id, login: payload.login, role: payload.acl[1] }, isFetching: false };
		}




		default: {
			return state;
		}
	}
};