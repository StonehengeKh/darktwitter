import React from "react";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, user, role, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (localStorage.authToken && user) {
        const has = role.some(el => el === user.role);
        if (!has) {
          return <Redirect to="/page not found" />;
        } else {
          return <Component {...props} />;
        }
      } else return <Redirect to="/auth" />;
    }}
  />
);

const mapStateToProps = ({ userReducer }) => ({
  user: userReducer.user
});

export default connect(mapStateToProps)(PrivateRoute);
