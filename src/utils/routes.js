import { Route, Redirect, useLocation } from "react-router-dom";

const user = null;

export const PublicRoute = ({ component: Component, loggedInRoute, ...restProps }) => {
  return user ? (
    <Redirect to={{ pathname: loggedInRoute }} />
  ) : (
    <Route {...restProps} component={Component} />
  );
};

export const PrivateRoute = ({ component: Component, ...restProps }) => {
  const location = useLocation();
  return !user ? (
    <Redirect to={{ pathname: "/signin", state: { from: location.pathname } }} />
  ) : (
    <Route {...restProps} component={Component} />
  );
};
