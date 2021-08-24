import { useEffect, useState } from "react";
import { createContext } from "react";
import toast from "react-hot-toast";
import api from "../services/api";
import usePersistedState from "../services/usePersistentState";
import { AuthContextType, AuthContextProps } from "../types/AuthContextType";

const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthContextProps) {
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tokenUser, setTokenAuth] = usePersistedState<string | null>(
    "token",
    null
  );

  useEffect(() => {
    if (tokenUser !== null || "") {
      setIsLogged(true);
    }
  }, [tokenUser]);

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);

    try {
      const { data } = await api.post("login", {
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      setTokenAuth(data.token);
      setIsLogged(true);
      setIsLoading(false);
      toast.success("Login efetuado com sucesso.");
    } catch (error) {
      if (JSON.stringify(error.message !== "")) {
        toast.error("Usuário e/ou senha invalidos.");
      }

      setIsLoading(false);
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
