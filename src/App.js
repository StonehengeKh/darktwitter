import React from "react";
import { connect } from "react-redux";
import PrivateRoute from "./components/PrivateRouter/PrivateRouter";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { NotFound } from './components/Nofound';
import HomePage from './components/News';
import Header from './components/Header';
import MyPage from './components/My page';
import Auth from './components/Auth'
import Post from './components/Post'
import Admin from './components/Admin';
import "./App.css";

export const ROUTERS = [
  {
    id: 1,
    link: {
      title: "Home page"
    },
    path: "/",
    component: HomePage,
    privateRoute: false,
    className: "header__link",
    exact: true,
    role: ["user", "admin"]
  },
  // {
  //   id: 10,
  //   link: {
  //     title: ""
  //   },
  //   path: "/search",
  //   component: Search,
  //   privateRoute: false,
  //   className: "header__link icon-search",
  //   exact: true,
  //   role: ["user", "admin"]
  // },
  {
    id: 2,
    link: {
      title: "My page"
    },
    path: "/My page",
    component: MyPage,
    className: "header__link",
    privateRoute: false,
    exact: true,
    role: ["user", "admin"]
  },
  // {
  //   id: 3,
  //   link: {
  //     title: "Add recipes"
  //   },
  //   path: "/Add recipes",
  //   component: AddRecipes,
  //   className: "header__link",
  //   privateRoute: true,
  //   exact: true,
  //   role: ["user", "admin"]
  // },
  {
    id: 4,
    link: {
      title: ""
    },
    path: "/auth",
    component: Auth,
    className: "header__link icon-enter",
    privateRoute: false,
    exact: true
  },
  // {
  //   id: 5,
  //   path: "/usercab",
  //   component: UserCab,
  //   privateRoute: true,
  //   exact: true,
  //   role: ["user", "admin"]
  // },
  // {
  //   id: 6,
  //   link: {
  //     title: "Admin"
  //   },
  //   path: "/admin",
  //   component: Admin,
  //   privateRoute: true,
  //   className: "header__link",
  //   exact: true,
  //   role: ["admin"]
  // },
  {
    id: 7,
    path: "/posts/:id",
    component: Post,
    privateRoute: false,
    exact: true,
    role: ["user", "admin"]
  },
  // {
  //   id: 8,
  //   path: "/update/:id",
  //   component: UpdateRecipe,
  //   privateRoute: true,
  //   exact: true,
  //   role: ["user", "admin"]
  // },
  {
    id: 9,
    component: NotFound,
    privateRoute: false,
    exact: true
  }
];


function App() {
  return (
    <Router>
      <Header/>
      <Switch>
        {ROUTERS.map(route => {
          const { path, component, privateRoute, exact, role, id } = route;
          return privateRoute ? (
            <PrivateRoute
              exact={exact}
              path={path}
              component={component}
              key={id}
              role={role}
            />
          ) : (
            <Route exact={exact} path={path} component={component} key={id} />
          );
        })}
      </Switch>
    </Router>
  );
}


const mapStateToProps = state => {
  return {

  };
};

export default connect(
  mapStateToProps
)(App);

