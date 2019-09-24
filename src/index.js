import React from "react";
import { Provider } from "react-redux";
import { render } from "react-dom";
import store from "../src/store";
import "./icomoon.css";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { tokenDecode } from "./actions/user";
import {getAllPosts} from './actions/posts'


store.dispatch(getAllPosts())
const token = localStorage.getItem("email");
if (token) store.dispatch(tokenDecode())

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
