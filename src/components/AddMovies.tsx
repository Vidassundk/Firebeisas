import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../config/firebase";

interface AddMoviesProps {
  onSubmitFunction?: () => void;
}

const AddMovies: React.FC<AddMoviesProps> = ({ onSubmitFunction }) => {
  const [title, setTitle] = useState<string>("");
  const [year, setYear] = useState<number>(0);

  const [receivedAnOscar, setReceivedAnOscar] = useState<boolean>(false);

  const onSubmit = async (): Promise<void> => {
    try {
      await addDoc(collection(db, "movies"), {
        title: title,
        releaseDate: year,
        receivedAnOscar: receivedAnOscar,
        userId: auth?.currentUser?.uid,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <input
        placeholder="Movie Title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="Movie Year"
        type="number"
        onChange={(e) => setYear(Number(e.target.value))}
      />
      <input
        placeholder="Received an Oscar"
        type="checkbox"
        checked={receivedAnOscar}
        onChange={(e) => setReceivedAnOscar(e.target.checked)}
      />
      <label>Received an Oscar</label>
      <button onClick={onSubmit}>Add Movie</button>
    </div>
  );
};

export default AddMovies;
