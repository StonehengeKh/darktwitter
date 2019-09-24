import { combineReducers } from 'redux';

import userReduser from './user';
import postsReduser from './posts';

export default combineReducers({
	userReduser,
	postsReduser
});