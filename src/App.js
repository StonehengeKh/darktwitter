import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import PrivateRoute from "./components/PrivateRouter/PrivateRouter";
import { NotFound } from "./containers/Nofound";
import Layout from "./components/Layout";
import HomePage from "./containers/News";
import Header from "./components/Header";
import MyPage from "./containers/My page";
import Auth from "./containers/Auth";
import Post from "./containers/Post";
import Admin from "./containers/Admin";
import UserCab from "./containers/Usercab";
import Search from "./containers/Search"
import "./App.css";

export const ROUTERS = [
  {
    id: 1,
    link: {
      title: "Home page"
    },
    path: "/",
    component: HomePage,
    privateRoute: true,
    className: "header__link",
    exact: true,
    role: ["user", "admin"]
  },
  {
    id: 10,
    link: {
      title: ""
    },
    path: "/search",
    component: Search,
    privateRoute: true,
    className: "header__link icon-search",
    exact: true,
    role: ["user", "admin"]
  },
  {
    id: 2,
    link: {
      title: "My page"
    },
    path: "/My page",
    component: MyPage,
    className: "header__link",
    privateRoute: true,
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
  {
    id: 5,
    path: "/usercab",
    component: UserCab,
    privateRoute: true,
    exact: true,
    role: ["user", "admin"]
  },
  {
    id: 6,
    link: {
      title: "Admin"
    },
    path: "/admin",
    component: Admin,
    privateRoute: true,
    className: "header__link",
    exact: true,
    role: ["admin"]
  },
  {
    id: 7,
    path: "/post/:id",
    component: Post,
    privateRoute: true,
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

class App extends React.Component {
  render() {
    const { isFetching } = this.props;
    return (
      <div>
        {isFetching ? (
          <div>Loading...</div>
        ) : (
          <Router>
              <Layout>
                <Switch>
                  {ROUTERS.map(route => {
                    const {
                      path,
                      component,
                      privateRoute,
                      exact,
                      role,
                      id
                    } = route;
                    return privateRoute ? (
                      <PrivateRoute
                        exact={exact}
                        path={path}
                        component={component}
                        key={id}
                        role={role}
                      />
                    ) : (
                      <Route
                        exact={exact}
                        path={path}
                        component={component}
                        key={id}
                      />
                    );
                  })}
                </Switch>
              </Layout>
          </Router>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isFetching: state.postsReduser.isFetching
  };
};

export default connect(mapStateToProps)(App);
