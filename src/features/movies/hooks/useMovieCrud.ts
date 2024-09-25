import { useState } from "react";
import {
  addMovie as addMovieService,
  deleteMovie as deleteMovieService,
  updateMovieTitle as updateMovieTitleService,
  uploadMovieImage as uploadMovieImageService,
} from "../../../services/movieService";

const useMovieCrud = (refreshMovies: () => void) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const addMovie = async (
    title: string,
    year: number,
    receivedAnOscar: boolean
  ) => {
    setLoading(true);
    setError(null);
    try {
      await addMovieService(title, year, receivedAnOscar);
      refreshMovies();
    } catch (err) {
      setError("Failed to add movie.");
    } finally {
      setLoading(false);
    }
  };

  const deleteMovie = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await deleteMovieService(id);
      refreshMovies();
    } catch (err) {
      setError("Failed to delete movie.");
    } finally {
      setLoading(false);
    }
  };

  const updateMovie = async (id: string, updatedMovieTitle: string) => {
    setLoading(true);
    setError(null);
    try {
      await updateMovieTitleService(id, updatedMovieTitle);
      refreshMovies();
    } catch (err) {
      setError("Failed to update movie title.");
    } finally {
      setLoading(false);
    }
  };

  const uploadFile = async (file: File, movieId: string) => {
    setLoading(true);
    setError(null);
    try {
      await uploadMovieImageService(file, movieId);
      refreshMovies();
    } catch (err) {
      setError("Failed to upload movie image.");
    } finally {
      setLoading(false);
    }
  };

  return {
    addMovie,
    deleteMovie,
    updateMovie,
    uploadFile,
    loading,
    error,
  };
};

export default useMovieCrud;
