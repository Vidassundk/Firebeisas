import React, { createContext, useContext } from "react";
import useMovieService from "./hooks/useMovieService";
import { MovieContextProps } from "./types";

// Create the MovieContext
const MovieContext = createContext<MovieContextProps | undefined>(undefined);

export const MovieProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { movieList, loading, error, fetchMovies } = useMovieService();

  return (
    <MovieContext.Provider
      value={{ movieList, loading, error, refreshMovies: fetchMovies }}
    >
      {children}
    </MovieContext.Provider>
  );
};

// Custom hook to use the MovieContext
export const useMovieContext = (): MovieContextProps => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error("useMovieContext must be used within a MovieProvider");
  }
  return context;
};
