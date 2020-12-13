import { useContext } from "react";
import { Route, Redirect, useLocation, useHistory } from "react-router-dom";

import { AuthContext } from "../context/auth";

export const PublicRoute = ({ component: Component, loggedInRoute, ...restProps }) => {
  const history = useHistory();
  const {
    auth: { isLoaded, user },
  } = useContext(AuthContext);

  if (!isLoaded) return null;
  return user ? (
    <Redirect to={{ pathname: history.location?.state?.from ?? loggedInRoute }} />
  ) : (
    <Route {...restProps} component={Component} />
  );
};

export const PrivateRoute = ({ component: Component, ...restProps }) => {
  const location = useLocation();
  const {
    auth: { isLoaded, user },
  } = useContext(AuthContext);

  if (!isLoaded) return null;
  return !user ? (
    <Redirect to={{ pathname: "/signin", state: { from: location.pathname } }} />
  ) : (
    <Route {...restProps} component={Component} />
  );
};
