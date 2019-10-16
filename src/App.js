import React from "react";
import { connect } from "react-redux";
import {  Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRouter/PrivateRouter";
import { NotFound } from "./containers/Nofound";
import Layout from "./components/Layout";
import HomePage from "./containers/Home page";
import Users from "./containers/Users";
import Following from "./containers/Following";
import Followers from "./containers/Followers";
import MyPage from "./containers/My page";
import Auth from "./containers/Auth";
import Post from "./containers/Post";
import Admin from "./containers/Admin";
import UserCab from "./containers/Usercab";
import Search from "./containers/Search";
import "./App.css";
// import { withRouter } from "react-router-dom";

export const ROUTERS = [
  {
    id: 1,
    link: {
      title: "Home"
    },
    path: "/",
    component: HomePage,
    privateRoute: true,
    className: "header__link",
    exact: true,
    icon: "icon-home3",
    role: ["user", "admin"]
  },
  {
    id: 10,
    link: {
      title: "Search"
    },
    path: "/search",
    component: Search,
    privateRoute: true,
    className: "header__link",
    exact: true,
    icon: "icon-search",
    role: ["user", "admin"]
  },
  {
    id: 11,
    link: {
      title: "Users"
    },
    path: "/users",
    component: Users,
    privateRoute: true,
    className: "header__link",
    exact: true,
    icon: "icon-users",
    role: ["user", "admin"]
  },
  {
    id: 12,
    link: {
      title: "Following"
    },
    path: "/following",
    component: Following,
    privateRoute: true,
    className: "header__link",
    exact: true,
    icon: "icon-user-check",
    role: ["user", "admin"]
  },
  {
    id: 13,
    link: {
      title: "Followers"
    },
    path: "/followers",
    component: Followers,
    privateRoute: true,
    className: "header__link",
    exact: true,
    icon: "icon-man-woman",
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
    icon: "icon-file-text2",
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
    className: "header__link",
    privateRoute: false,
    icon: "icon-enter",
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
      <div className="main-wrapper">
        {isFetching ? (
          <div>Loading...</div>
        ) :   
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
        }
      </div>
    );
  }
}

const mapStateToProps = ({ userReduser }) => {
  return {
    isFetching: userReduser.isFetching
  };
};

export default connect(mapStateToProps)(App);
