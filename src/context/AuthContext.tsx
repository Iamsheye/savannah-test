import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { loginUser } from "../services/auth";
import { User } from "../types";
import { toastError } from "../utils";

interface AuthContextType {
  user: User | null;
  login: (data: { username: string; password: string }) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setIsLoading(false);
  }, []);

  const login = async (data: { username: string; password: string }) => {
    try {
      const res = await loginUser(data);

      const userData: User = { username: data.username, token: res.token };

      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      navigate({ to: "/dashboard", replace: true });
    } catch (error) {
      toastError(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
