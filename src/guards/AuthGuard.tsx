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
  const { loading, auth } = useContext(AuthContext);

  if (loading) return <></>;

  return (
    <Route
      {...rest}
      render={(props) =>
        auth ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default AuthGuard;