export interface Movie {
  id: string;
  title: string;
  receivedAnOscar: boolean;
  imageUrl: string;
  releaseYear: number;
}

export interface MovieContextProps {
  movieList: Movie[];
  loading: boolean;
  error: string | null;
  refreshMovies: () => void;
}

export interface MovieListItemProps {
  movie: Movie;
  updateFunction: (id: string, updatedMovieTitle: string) => Promise<void>;
  deleteFunction: (id: string) => Promise<void>;
  uploadFileFunction: (file: File, movieId: string) => Promise<void>;
}

export interface MovieFormInput {
  title: string;
  year: number;
}

export interface MovieListItemHookProps {
  id: string;
  title: string;
}
