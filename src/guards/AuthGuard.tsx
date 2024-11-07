import React from "react";
import { Redirect, Route } from "react-router-dom";

interface AuthGuardProps {
  component: React.ComponentType<any>;
  isAuthenticated: boolean;
  path: string;
  exact?: boolean;
}

const AuthGuard: React.FC<AuthGuardProps> = ({
  component: Component,
  isAuthenticated,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default AuthGuard;