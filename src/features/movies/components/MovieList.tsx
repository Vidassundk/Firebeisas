import React from "react";
import useMovieCrud from "../hooks/useMovieCrud";
import MovieListItem from "./MovieListItem";
import Typography from "../../../components/Typography";
import { useFetchMovies, useMovieContext } from "../MovieContext";

const MovieList = () => {
  const fetchMovies = useFetchMovies();
  const { movieList, loading, error } = useMovieContext();
  const { deleteMovie, updateMovie, uploadFile } = useMovieCrud(fetchMovies); // Pass fetchMovies here

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography variant="error">{error}</Typography>;

  return (
    <section className="flex flex-col gap-12">
      {movieList.map((movie) => (
        <MovieListItem
          key={movie.id}
          movie={movie}
          updateFunction={(id, title) => updateMovie(id, title)}
          deleteFunction={(id) => deleteMovie(id)}
          uploadFileFunction={(file, movieId) => uploadFile(file, movieId)}
        />
      ))}
    </section>
  );
};

export default MovieList;
