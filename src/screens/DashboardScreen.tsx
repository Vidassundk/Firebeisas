import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import HeaderLayout from "../components/HeaderLayout";
import { useAuth } from "../features/auth/hooks/useAuth";
import AddMovieForm from "../features/movies/components/AddMovieForm";
import MovieList from "../features/movies/components/MovieList";

const DashboardScreen: React.FC = () => {
  const { user } = useAuth();

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <HeaderLayout user={user} logout={logout}>
      <div className="flex flex-col w-full gap-12">
        <section className="p-6 max-w-full rounded-lg bg-slate-100">
          <AddMovieForm />
        </section>
        <MovieList />
      </div>
    </HeaderLayout>
  );
};

export default DashboardScreen;
