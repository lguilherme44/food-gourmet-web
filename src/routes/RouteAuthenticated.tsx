import { Redirect, Route, RouteProps } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const RouteAuthenticated = ({ component: Component, path }: RouteProps) => {
  const { isLogged } = useAuth();

  if (!isLogged) {
    return <Redirect to="/" />;
  }

  return <Route component={Component} path={path} />;
};

export default RouteAuthenticated;
