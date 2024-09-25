import React from "react";
import useMovieService from "../hooks/useMovieService";
import useMovieCrud from "../hooks/useMovieCrud";
import MovieListItem from "./MovieListItem";
import Typography from "../../../components/Typography";

const MovieList = () => {
  const { movieList, loading, error, fetchMovies } = useMovieService();
  const { deleteMovie, updateMovie, uploadFile } = useMovieCrud();

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography variant="error">{error}</Typography>;

  return (
    <section className="flex flex-col gap-12">
      {movieList.map((movie) => (
        <MovieListItem
          key={movie.id}
          movie={movie}
          updateFunction={(id, title) => updateMovie(id, title, fetchMovies)}
          deleteFunction={(id) => deleteMovie(id, fetchMovies)}
          uploadFileFunction={(file, movieId) =>
            uploadFile(file, movieId, fetchMovies)
          }
        />
      ))}
    </section>
  );
};

export default MovieList;
