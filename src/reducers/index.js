import { combineReducers } from 'redux';

import userReduser from './user';
import postsReduser from './posts';
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
	userReduser,
	postsReduser,
	form: formReducer
});