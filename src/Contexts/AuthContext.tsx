import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { Preferences } from '@capacitor/preferences';

interface AuthContextType {
  auth: { email: string } | null;
  setAuth: React.Dispatch<React.SetStateAction<{ email: string } | null>>;
  setUserData: (userData: any) => void;
  deleteUserData: () => void;
}

const initialValues = {
  auth: null,
  setAuth: () => {},
  setUserData: () => {},
  deleteUserData: () => {},
}

export const AuthContext = createContext<AuthContextType>(initialValues);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<{ email: string } | null>(initialValues.auth);

  const loadUserData = async () => {
    const storedUser = await Preferences.get({ key: 'user' });
    console.log('Stored user data from Preferences:', storedUser.value);
    if (storedUser.value) {
      setAuth(JSON.parse(storedUser.value));
    }
  };
  
  useEffect(() => {
    loadUserData();
  }, []);

  async function setUserData(userData: { email: string }) {
    await Preferences.set({
      key: 'user',
      value: JSON.stringify(userData),
    });
    setAuth(userData);
  }

  async function deleteUserData() {
    await Preferences.remove({ key: 'user' });
    setAuth(initialValues.auth);
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth, setUserData, deleteUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;