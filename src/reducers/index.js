import { combineReducers } from 'redux';

import userReducer from './user';
import usersReducer from './users';
import postsReducer from './posts';
import postReducer from './post';
import searchReducer from './search';
import myPostsReducer from './myposts';
import selectedUserReducer from './selectedUser'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
	userReducer,
	postsReducer,
	myPostsReducer,
	usersReducer,
	postReducer,
	selectedUserReducer,
	searchReducer,
	form: formReducer
});