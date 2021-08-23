import { Switch, BrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Admin from "../pages/Admin";
import RouteAuthenticated from "./RouteAuthenticated";
import RouteUnauthenticated from "./RouteUnauthenticated";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <RouteUnauthenticated path="/" exact component={Login} />
      <RouteAuthenticated path="/admin" component={Admin} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
