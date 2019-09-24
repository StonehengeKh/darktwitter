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
		case types.USER_REQUEST_LOGIN_SUCCESS: {
			return { ...state, isFetching: false, user: {role: "user"}, incorected: false };
		}
		case types.USER_REQUEST_LOGIN_FAIL: {
			return { ...state, isFetching: false, incorected: true };
		}

		case types.USER_REQUEST_AUTHORIZATION: {
			return { ...state, user: null, autoriz: true };
		}
		case types.USER_REQUEST_AUTHORIZATION_SUCCESS: {
			return { ...state, autoriz: false, user: payload };
		}
		case types.USER_REQUEST_AUTHORIZATION_FAIL: {
			return { ...state, autoriz: false };
		}
		case types.DEL_USER: {
			return { ...state, user: null };
		}

		case types.SET_USER_TO_UPDATE: {
			return {
				...state,
				updateUs: { ...state.user }
			};
		}

		case types.UPDATE_USER: {
			return {
				...state,
				touch: true,
				updateUs: {
					...state.updateUs,
					[name]: payload
				}
			};
		}

		case types.UPDATE_USER_SAVE_REQUEST: {
			return { ...state, update: true, updateError: false };
		}
		case types.UPDATE_USER_SAVE_REQUEST_SUCCESS: {
			return { ...state, update: false, touch: false, user: payload, updateUs: null };
		}
		case types.UPDATE_USER_SAVE_REQUEST_FAIL: {
			return { ...state, update: false, updateError: true };
		}
		case types.ADD_USER: {
			return { ...state, user:{id: payload.id, login: payload.login, role: payload.acl[1] } };
		}




		default: {
			return state;
		}
	}
};