import React, { createContext, useState, ReactNode } from 'react';

interface AuthContextType {
  auth: { email: string } | null,
  setAuth: React.Dispatch<React.SetStateAction<{ email: string } | null>>;
  setUserData: (userData: any) => void;
}

const initialValues = {
  auth: null,
  setAuth: () => {},
  setUserData: () => {},
}

export const AuthContext = createContext<AuthContextType>(initialValues);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<{ email: string } | null>(initialValues.auth);

  function setUserData(userData: { email: string }) {
    // TODO: adicionar preferences para armazenar user data
    setAuth(userData);
  }

  // TODO: function deleteUserData => remove preferences => setAuth(null)

  return (
    <AuthContext.Provider value={{ auth, setAuth, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;