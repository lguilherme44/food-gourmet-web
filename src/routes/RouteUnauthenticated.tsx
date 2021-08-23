import { Redirect, Route, RouteProps } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const RouteUnauthenticated = ({ component: Component, path }: RouteProps) => {
  const { isLogged } = useAuth();

  if (isLogged) {
    return <Redirect to="/admin" />;
  }

  return <Route component={Component} path={path} />;
};

export default RouteUnauthenticated;
