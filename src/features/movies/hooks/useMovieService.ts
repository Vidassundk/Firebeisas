import { useState, useEffect } from "react";
import { getMovieList as fetchMoviesFromService } from "../../../services/movieService";
import { Movie } from "../types";

const useMovieService = () => {
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = async () => {
    setLoading(true);
    setError(null);
    try {
      const moviesData = await fetchMoviesFromService();
      setMovieList(moviesData);
    } catch (err) {
      setError("Failed to fetch movies.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return {
    movieList,
    loading,
    error,
    fetchMovies,
  };
};

export default useMovieService;
