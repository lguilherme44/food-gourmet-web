import { ReactNode } from "react";

export interface AuthContextType {
  handleLogin: (email: string, password: string) => {};
  handleLogout: () => {};
  isLogged: boolean;
  isLoading: boolean;
  tokenUser: string | null;
}

export interface AuthContextProps {
  children: ReactNode;
}
