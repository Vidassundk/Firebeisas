import React from "react";
import AddMovies from "../components/AddMovies";
import MovieList from "../components/MovieList";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useAuth } from "../hooks/useAuth";
import HeaderLayout from "../components/UI/HeaderLayout";
import useMovieService from "../hooks/useMovieService";

const DashboardScreen = () => {
  const {
    movieList,
    loading,
    error,
    deleteMovie,
    updateMovie,
    uploadFile,
    register,
    handleSubmit,
    errors,
    receivedAnOscar,
    setReceivedAnOscar,
    onSubmit,
  } = useMovieService();

  // Auth functionality
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  const { user } = useAuth();

  return (
    <HeaderLayout user={user} logout={logout}>
      <div className="flex flex-col w-full gap-12">
        <AddMovies
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
          receivedAnOscar={receivedAnOscar}
          setReceivedAnOscar={setReceivedAnOscar}
          onSubmit={onSubmit}
        />

        <MovieList
          movieList={movieList}
          loading={loading}
          error={error}
          deleteMovie={deleteMovie}
          updateMovie={updateMovie}
          uploadFile={uploadFile}
        />
      </div>
    </HeaderLayout>
  );
};

export default DashboardScreen;
