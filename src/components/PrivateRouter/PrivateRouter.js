import React from "react";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, user, role, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (localStorage.authToken) {
        if (user) {
          const has = role.some(el => el === user.role);
          if (!has) {
            return <Redirect to="/not" />;
          } else {
            return <Component {...props} />;
          }
        }
      } else return <Redirect to="/auth" />;
    }}
  />
);

const mapStateToProps = state => ({
  user: state.userReduser.user
});

export default connect(mapStateToProps)(PrivateRoute);
