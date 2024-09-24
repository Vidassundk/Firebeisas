// src/services/movieService.ts

import {
  doc,
  updateDoc,
  deleteDoc,
  getDocs,
  collection,
  addDoc,
} from "firebase/firestore";
import { auth, db, storage } from "../config/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

interface Movie {
  id: string;
  title: string;
  receivedAnOscar: boolean;
  imageUrl: string;
  releaseYear: number;
}

// Fetch the list of movies
export const getMovieList = async (): Promise<Movie[]> => {
  const moviesCollection = collection(db, "movies");
  const moviesSnapshot = await getDocs(moviesCollection);

  // Map Firestore documents to the Movie interface
  const moviesData = moviesSnapshot.docs.map((doc) => {
    const data = doc.data(); // Get the document data
    return {
      id: doc.id,
      title: data.title,
      receivedAnOscar: data.receivedAnOscar,
      imageUrl: data.imageUrl,
      releaseYear: data.releaseDate,
    };
  });

  return moviesData;
};

// Update the movie title
export const updateMovieTitle = async (
  id: string,
  updatedMovieTitle: string
) => {
  try {
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, { title: updatedMovieTitle });
  } catch (error) {
    console.error("Error updating movie title:", error);
    throw error;
  }
};

// Delete a movie
export const deleteMovie = async (id: string) => {
  try {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
  } catch (error) {
    console.error("Error deleting movie:", error);
    throw error;
  }
};

// Upload a movie image
export const uploadMovieImage = async (file: File, movieId: string) => {
  if (!file) throw new Error("No file provided");

  const storageRef = ref(storage, `movieImages/${movieId}/${file.name}`);

  try {
    // Upload the file to Firebase Storage
    await uploadBytes(storageRef, file);

    // Get the file's download URL
    const downloadURL = await getDownloadURL(storageRef);

    // Update the Firestore document with the image URL
    const movieDoc = doc(db, "movies", movieId);
    await updateDoc(movieDoc, { imageUrl: downloadURL });

    return downloadURL;
  } catch (error) {
    console.error("Error uploading movie image:", error);
    throw error;
  }
};

export const addMovie = async (
  title: string,
  year: number,
  receivedAnOscar: boolean
) => {
  try {
    const newMovie = {
      title,
      releaseDate: year,
      receivedAnOscar,
      userId: auth?.currentUser?.uid, // Assuming auth is set up
    };

    const docRef = await addDoc(collection(db, "movies"), newMovie);

    return docRef.id; // Return the movie document ID
  } catch (error) {
    console.error("Error adding new movie:", error);
    throw error;
  }
};
