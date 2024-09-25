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

export const getMovieList = async (): Promise<Movie[]> => {
  const moviesCollection = collection(db, "movies");
  const moviesSnapshot = await getDocs(moviesCollection);

  const moviesData = moviesSnapshot.docs.map((doc) => {
    const data = doc.data();
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

export const deleteMovie = async (id: string) => {
  try {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
  } catch (error) {
    console.error("Error deleting movie:", error);
    throw error;
  }
};

export const uploadMovieImage = async (file: File, movieId: string) => {
  if (!file) throw new Error("No file provided");

  const storageRef = ref(storage, `movieImages/${movieId}/${file.name}`);

  try {
    await uploadBytes(storageRef, file);

    const downloadURL = await getDownloadURL(storageRef);

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
      userId: auth?.currentUser?.uid,
    };

    const docRef = await addDoc(collection(db, "movies"), newMovie);

    return docRef.id;
  } catch (error) {
    console.error("Error adding new movie:", error);
    throw error;
  }
};
