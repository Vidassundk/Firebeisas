import React from "react";
import MovieListItem from "./MovieListItem";
import Typography from "./UI/Typography";

const MovieList = ({
  movieList,
  loading,
  error,
  deleteMovie,
  updateMovie,
  uploadFile,
}) => {
  if (loading) {
    return <Typography variant="p">Loading movies...</Typography>;
  }

  if (error) {
    return (
      <Typography variant="p" className="text-red-500">
        {error}
      </Typography>
    );
  }

  return (
    <section className="flex flex-col gap-12">
      {movieList.map((movie) => (
        <MovieListItem
          key={movie.id}
          movie={movie}
          updateFunction={updateMovie}
          deleteFunction={deleteMovie}
          uploadFileFunction={uploadFile}
        />
      ))}
    </section>
  );
};

export default MovieList;
