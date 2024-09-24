import React from "react";
import AddMovies from "../components/AddMovies";
import MovieList from "../components/MovieList";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useAuth } from "../hooks/useAuth";
import HeaderLayout from "../components/UI/HeaderLayout";
import useMovieService from "../hooks/useMovieService"; // Import the unified movie service hook

const DashboardScreen = () => {
  // Initialize movie service hook in the parent component
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
    onSubmit, // Form submit handler for adding a movie
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
        {/* Pass the relevant form props to AddMovies */}
        <AddMovies
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
          receivedAnOscar={receivedAnOscar}
          setReceivedAnOscar={setReceivedAnOscar}
          onSubmit={onSubmit}
        />
        {/* Pass the movie list props to MovieList */}
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
