import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useMovieCrud from "./useMovieCrud";
import { MovieListItemHookProps } from "../types";
import { movieTitleSchema } from "../schemas/movieSchema";

const useMovieItemForm = ({ id, title }: MovieListItemHookProps) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const { updateMovie, deleteMovie, uploadFile, loading, error } =
    useMovieCrud();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(movieTitleSchema),
    defaultValues: {
      updatedMovieTitle: title,
    },
  });

  const onSubmit = async (data: { updatedMovieTitle: string }) => {
    await updateMovie(id, data.updatedMovieTitle, () => {});
    reset();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/gif"];

    if (!validTypes.includes(file.type)) {
      return setFileError("Please upload a valid image file (jpg, png, gif)");
    }

    setUploadedFile(file);
    setFileError(null);
  };

  const uploadHandler = async () => {
    if (uploadedFile) {
      await uploadFile(uploadedFile, id, () => {});
      setUploadedFile(null);
    }
  };

  const deleteHandler = async () => {
    await deleteMovie(id, () => {});
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    handleFileChange,
    uploadHandler,
    deleteHandler,
    errors,
    fileError,
    uploadedFile,
    loading,
    error,
  };
};

export default useMovieItemForm;
