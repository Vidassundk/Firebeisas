import React, { useContext, useState, useEffect, createContext } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../config/firebase";

interface AuthContextProps {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  isAuthenticated: false,
  loading: true,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
