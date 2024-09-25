// App.tsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import AuthScreen from "./screens/AuthScreen";
import DashboardScreen from "./screens/DashboardScreen";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "./features/auth/AuthProvider";
import { useAuth } from "./features/auth/hooks/useAuth";
import { MovieProvider } from "./features/movies/MovieContext";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <MovieProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<AuthScreen />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardScreen />} />
              <Route path="/" element={<Navigate to="/dashboard" />} />
            </Route>
          </Routes>
        </Router>
      </MovieProvider>
    </AuthProvider>
  );
};

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default App;
