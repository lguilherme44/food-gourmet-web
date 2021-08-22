import { Switch, Route, BrowserRouter } from "react-router-dom";

import Login from "../pages/Login";
import Admin from "../pages/Admin";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/admin" component={Admin} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
