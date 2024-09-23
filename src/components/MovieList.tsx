import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db, storage } from "../config/firebase";
import { getMovieList } from "../util/movieService";
import MovieListItem from "./MovieListItem";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const MovieList = () => {
  const [movieList, setMovieList] = useState([]);

  const fetchMovies = async () => {
    try {
      const moviesData = await getMovieList();
      setMovieList(moviesData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const deleteMovie = async (id) => {
    try {
      await deleteDoc(doc(db, "movies", id));
      fetchMovies();
    } catch (error) {
      console.log(error);
    }
  };

  const updateMovie = async (id, updatedMovieTitle) => {
    try {
      await updateDoc(doc(db, "movies", id), {
        title: updatedMovieTitle,
      });
      fetchMovies();
    } catch (error) {
      console.log(error);
    }
  };

  const uploadFile = async (file, movieId) => {
    if (!file) return;
    const storageRef = ref(storage, `movieImages/${movieId}/${file.name}`);

    try {
      // Upload the file to Firebase Storage
      await uploadBytes(storageRef, file);

      // Get the file's download URL
      const downloadURL = await getDownloadURL(storageRef);

      // Update the Firestore document with the image URL
      await updateDoc(doc(db, "movies", movieId), {
        imageUrl: downloadURL,
      });

      console.log("File uploaded and movie updated with image URL");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
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
