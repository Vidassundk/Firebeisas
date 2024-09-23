// movieService.js

import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

// Function to fetch movie list
export const getMovieList = async () => {
  const moviesCollectionRef = collection(db, "movies");
  try {
    const querySnapshot = await getDocs(moviesCollectionRef);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.log(error);
    throw error;
  }
};
