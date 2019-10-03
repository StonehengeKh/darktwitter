import { combineReducers } from 'redux';

import userReduser from './user';
import postsReduser from './posts';
import myPostsReduser from './myposts';
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
	userReduser,
	postsReduser,
	myPostsReduser,
	form: formReducer
});