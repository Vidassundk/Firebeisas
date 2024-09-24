import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addMovie,
  getMovieList as fetchMoviesFromService,
  deleteMovie as deleteMovieService,
  updateMovieTitle as updateMovieTitleService,
  uploadMovieImage as uploadMovieImageService,
} from "../services/movieService";

const movieSchema = z.object({
  title: z.string().min(1, { message: "Movie title is required" }),
  year: z
    .number({
      invalid_type_error: "Year must be a number",
    })
    .min(1900, { message: "Year must be greater than or equal to 1900" })
    .max(new Date().getFullYear(), { message: "Year cannot be in the future" }),
});

interface MovieFormInput {
  title: string;
  year: number;
}

interface Movie {
  id: string;
  title: string;
  receivedAnOscar: boolean;
  imageUrl: string;
  releaseYear: number;
}

const useMovieService = () => {
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [receivedAnOscar, setReceivedAnOscar] = useState<boolean>(false);

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

  const deleteMovie = async (id: string) => {
    try {
      await deleteMovieService(id);
      fetchMovies();
    } catch (err) {
      setError("Failed to delete movie.");
    }
  };

  const updateMovie = async (id: string, updatedMovieTitle: string) => {
    try {
      await updateMovieTitleService(id, updatedMovieTitle);
      fetchMovies();
    } catch (err) {
      setError("Failed to update movie title.");
    }
  };

  const uploadFile = async (file: File, movieId: string) => {
    try {
      await uploadMovieImageService(file, movieId);
      fetchMovies(); // Refresh the list after upload
    } catch (err) {
      setError("Failed to upload movie image.");
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MovieFormInput>({
    resolver: zodResolver(movieSchema),
  });

  const onSubmit = async (data: MovieFormInput) => {
    try {
      await addMovie(data.title, data.year, receivedAnOscar);
      reset();
      setReceivedAnOscar(false);
      fetchMovies();
    } catch (error) {
      console.error("Error adding movie:", error);
    }
  };

  return {
    movieList,
    loading,
    error,
    deleteMovie,
    updateMovie,
    uploadFile,
    fetchMovies,
    register,
    handleSubmit,
    errors,
    receivedAnOscar,
    setReceivedAnOscar,
    onSubmit,
  };
};

export default useMovieService;
