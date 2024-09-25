import { createContext } from "react";
import { User } from "firebase/auth";

export interface AuthContextProps {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  isAuthenticated: false,
  loading: true,
});
