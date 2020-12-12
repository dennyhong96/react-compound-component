import { Switch } from "react-router-dom";

import { PrivateRoute, PublicRoute } from "./utils/routes";
import { Home, Browse, Signin, Signup } from "./pages";
import * as ROUTES from "./constants/routes";

const App = () => {
  return (
    <Switch>
      <PublicRoute exact path={ROUTES.SIGN_IN} component={Signin} />
      <PublicRoute exact path={ROUTES.SIGN_UP} component={Signup} />
      <PrivateRoute loggedInRoute={ROUTES.BROWSE} exact path={ROUTES.BROWSE} component={Browse} />
      <PublicRoute loggedInRoute={ROUTES.BROWSE} exact path={ROUTES.HOME} component={Home} />
    </Switch>
  );
};

export default App;
