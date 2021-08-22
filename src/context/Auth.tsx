import { useState } from "react";
import { createContext, ReactNode } from "react";
import api from "../services/api";

interface AuthContextProps {
  children: ReactNode;
}

interface AuthContextType {
  handleLogin: (email: string, password: string) => Promise<void>;
  handleLogout: () => void;
  isLogged: boolean;
  isLoading: boolean;
}

const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthContextProps) {
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    const { data } = await api.post("sessions", { email, password });

    if (data) {
      localStorage.setItem("token", data.token);
      setIsLogged(true);
      setIsLoading(false);
      return;
    }
  };

  const handleLogout = async () => {
    localStorage.clear();
  };

  return (
    <AuthContext.Provider
      value={{ handleLogin, isLogged, isLoading, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
