import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

interface AuthGuardProps {
  component: React.ComponentType<any>;
  path: string;
  exact?: boolean;
}

const AuthGuard: React.FC<AuthGuardProps> = ({
  component: Component,
  ...rest
}) => {
  const { auth } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        auth ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default AuthGuard;