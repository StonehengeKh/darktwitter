import { combineReducers } from 'redux';

import userReduser from './user';
import usersReduser from './users';
import postsReduser from './posts';
import postReduser from './post';
import myPostsReduser from './myposts';
import selectedUserReducer from './selectedUser'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
	userReduser,
	postsReduser,
	myPostsReduser,
	usersReduser,
	postReduser,
	selectedUserReducer,
	form: formReducer
});