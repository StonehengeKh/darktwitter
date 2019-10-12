import { combineReducers } from 'redux';

import userReduser from './user';
import folowingReduser from './following';
import postsReduser from './posts';
import postReduser from './post';
import myPostsReduser from './myposts';
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
	userReduser,
	postsReduser,
	myPostsReduser,
	folowingReduser,
	postReduser,
	form: formReducer
});