import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const ProtectedRoute = (props) => {
  const { redirectPath, component, user, ...routeProps } = props;
  const Component = component;
  const isAccessible = Boolean(user);

  return (
    <Route
      {...routeProps}
      render={(props) => {
        if (isAccessible) return <Component {...props} />;
        return <Redirect to={{ pathname: redirectPath || "/login" }} />;
      }}
    />
  );
};

ProtectedRoute.propTypes = {
  path: PropTypes.string.isRequired||PropTypes.array.isRequired,
  redirectPath: PropTypes.string,
  component: PropTypes.oneOfType([
    PropTypes.shape({ render: PropTypes.func.isRequired }),
    PropTypes.func,
  ]),
};

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export const RouteProtected=connect(mapStateToProps)(ProtectedRoute);
