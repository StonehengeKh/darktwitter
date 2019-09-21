import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import reducers from "../reducers";

const logger = createLogger({
	collapsed: true
});
let middleware = [];
if (process.env.NODE_ENV === 'development') {
	middleware = [...middleware, thunk, logger];
} else {
	middleware = [...middleware, thunk];
}

export default createStore(reducers, applyMiddleware(...middleware));
