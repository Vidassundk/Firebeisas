import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface MovieListItemProps {
  id: string;
  title: string;
  receivedAnOscar: boolean;
  imageUrl: string;
  updateFunction: (id: string, updatedMovieTitle: string) => Promise<void>;
  deleteFunction: (id: string) => Promise<void>;
  uploadFileFunction: (file: File, movieId: string) => Promise<void>;
}

const movieTitleSchema = z.object({
  updatedMovieTitle: z.string().min(1, { message: "Title cannot be empty" }),
});

const useMovieListItem = ({
  id,
  updateFunction,
  deleteFunction,
  uploadFileFunction,
}: MovieListItemProps) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(movieTitleSchema),
    defaultValues: {
      updatedMovieTitle: "",
    },
  });

  const onSubmit = async (data: { updatedMovieTitle: string }) => {
    try {
      await updateFunction(id, data.updatedMovieTitle);
      reset();
    } catch (error) {
      console.error("Error updating movie title:", error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    // Sita aptareme per meet'a. Tai patarimas visada vengti nested if'u.

    // if (!file) {
    //   return;
    // }

    // const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
    // const isImageValid = validImageTypes.includes(file.type);

    // if (!isImageValid) {
    //   setFileError("Please upload a valid image file (jpg, png, gif)");

    //   return;
    // }

    // setUploadedFile(file);

    if (file) {
      const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
      if (validImageTypes.includes(file.type)) {
        setUploadedFile(file);
        setFileError(null);
      } else {
        setUploadedFile(null);
        setFileError("Please upload a valid image file (jpg, png, gif)");
      }
    }
  };

  const uploadHandler = async () => {
    if (uploadedFile) {
      try {
        await uploadFileFunction(uploadedFile, id);
        setUploadedFile(null); // Clear the file input after successful upload
      } catch (error) {
        console.error("Error uploading movie image:", error);
      }
    }
  };

  const deleteHandler = async () => {
    try {
      await deleteFunction(id);
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    handleFileChange,
    uploadHandler,
    deleteHandler,
    errors,
    uploadedFile,
    fileError,
  };
};

export default useMovieListItem;
