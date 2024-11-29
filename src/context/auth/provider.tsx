import { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { loginUser } from "../../services/auth";
import { User } from "../../types";
import { toastError } from "../../utils";
import AuthContext from ".";

function AuthProvider({ children }: { children: React.ReactNode }) {
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
    navigate({ to: "/login", replace: true });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
