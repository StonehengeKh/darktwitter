import React from "react";
import { Provider } from "react-redux";
import { render } from "react-dom";
import store from "../src/store";
import "./icomoon.css";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { tokenDecode } from "./actions/user";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import { getAllPosts } from "./actions/posts";
import { getAllMyPosts } from "./actions/myposts";
import jwt_decode from "jwt-decode";

// let ID = ["5d6fccfc5fce6722147978f2", "5d66e01dc6a7071408ac1e1c"]

const token = localStorage.getItem("authToken");
if (token) {
  store.dispatch(tokenDecode());
  let decode = jwt_decode(localStorage.authToken);
  // store.dispatch(getAllPosts());
  store.dispatch(getAllMyPosts(decode.sub.id));
  // store.dispatch(userFindOne(decode.sub.id));

  // store.dispatch(getAllMyPosts(ID))
}

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
