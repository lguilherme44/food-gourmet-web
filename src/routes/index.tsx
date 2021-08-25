import { Switch, Router, Route, Redirect, RouteProps } from "react-router-dom";
import Login from "../pages/Login";
import Admin from "../pages/Admin";
import Home from "../pages/Home";

import { useAuth } from "../hooks/useAuth";
import history from "../services/history";

export default function Routes() {
  interface PropsCustomRoute extends RouteProps {
    isPrivate?: boolean;
    admin?: boolean;
  }

  const CustomRoute: React.FC<PropsCustomRoute> = ({
    isPrivate = false,
    admin = false,
    ...rest
  }) => {
    const { isLogged } = useAuth();

    if (isLogged && rest.path === "/") {
      return <Redirect to="/admin" />;
    }

    if (isPrivate && !isLogged) {
      return <Redirect to="/" />;
    }

    return <Route {...rest} />;
  };

  return (
    <Router history={history}>
      <Switch>
        <CustomRoute exact path="/" component={Login} />
        <CustomRoute path="/home" component={Home} />

        <CustomRoute isPrivate path="/admin" admin component={Admin} />
      </Switch>
    </Router>
  );
}
