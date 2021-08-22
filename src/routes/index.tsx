import { Switch, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Login} />
    <Route path="/admin" component={Dashboard} />
  </Switch>
);

export default Routes;
