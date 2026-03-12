import React, { createContext, useContext, useState } from 'react';

type User = {
  username: string;
  phone: string;
  email?: string;
};

type AuthContextType = {
  user: User | null;
  isLoggedIn: boolean;
  login: (username: string, phone: string) => void;
  register: (username: string, phone: string, email: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: any) => {

  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (username: string, phone: string) => {
    setUser({ username, phone });
    setIsLoggedIn(true);
  };

  const register = (username: string, phone: string, email: string) => {
    setUser({ username, phone, email });
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);