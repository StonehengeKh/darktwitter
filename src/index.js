import React from "react";
import { Provider } from "react-redux";
import { render } from "react-dom";
import store from "../src/store";
import "./icomoon.css";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { tokenDecode } from "./actions/user";
import { BrowserRouter as Router} from "react-router-dom";

const token = localStorage.getItem("authToken");
if (token) {
  store.dispatch(tokenDecode());
}

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
