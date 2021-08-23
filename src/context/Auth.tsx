import { useEffect, useState } from "react";
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
  tokenUser: string;
}

const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthContextProps) {
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tokenUser, setTokenAuth] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setTokenAuth(token);
    }
  }, []);

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
    setIsLogged(false);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider
      value={{ handleLogin, isLogged, isLoading, handleLogout, tokenUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
