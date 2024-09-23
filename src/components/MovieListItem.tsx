import React, { useState } from "react";

interface MovieListItemProps {
  movie: {
    id: number;
    title: string;
    receivedAnOscar: boolean;
    imageUrl: string;
  };
  updateFunction: (id: number, updatedMovieTitle: string) => void;
  deleteFunction: (id: number) => void;
  uploadFileFunction: (file: File, movieId: number) => void;
}

const MovieListItem = ({
  movie,
  updateFunction,
  deleteFunction,
  uploadFileFunction,
}: MovieListItemProps) => {
  const [updatedMovieTitle, setUpdatedMovieTitle] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const uploadHandler = () => {
    uploadFileFunction(uploadedFile, movie.id);
  };

  return (
    <div style={{ color: movie.receivedAnOscar ? "green" : "red" }}>
      {movie.title}

      {movie.imageUrl && (
        <img src={movie.imageUrl} alt={movie.title} width="100" />
      )}

      <input
        placeholder="new title"
        value={updatedMovieTitle}
        onChange={(e) => setUpdatedMovieTitle(e.target.value)}
      />
      <button onClick={() => updateFunction(movie.id, updatedMovieTitle)}>
        Update
      </button>
      <button onClick={() => deleteFunction(movie.id)}>Delete</button>

      <div>
        <input
          type="file"
          onChange={(e) => setUploadedFile(e.target.files[0])}
        />
        <button onClick={uploadHandler}>Upload</button>
      </div>
    </div>
  );
};

export default MovieListItem;
