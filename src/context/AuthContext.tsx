import React, { useState, createContext } from "react";
import { UserDetail } from "../types/index";

interface AuthContextType {
  user: UserDetail | undefined;
  login: (userData: UserDetail) => void;
  logout: () => void;
}

export const authContext = createContext<AuthContextType>({
  user: undefined,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserDetail | undefined>(undefined);

  const login = (userData: UserDetail) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(undefined);
  };

  const value: AuthContextType = { user, login, logout };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}
