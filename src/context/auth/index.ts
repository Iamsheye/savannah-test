import { createContext } from "react";
import { User } from "../../types";

interface AuthContextType {
  user: User | null;
  login: (data: { username: string; password: string }) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;
