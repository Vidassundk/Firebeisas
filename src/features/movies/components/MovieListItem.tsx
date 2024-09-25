import React from "react";
import Typography from "../../../components/Typography";
import InputWithLabel from "../../../components/InputWithLabel";
import Button from "../../../components/Button";
import useMovieItemForm from "../hooks/useMovieItemForm"; // Import the refactored hook
import Badge from "../../../components/Badge";
import { MovieListItemProps } from "../types";

const MovieListItem: React.FC<MovieListItemProps> = ({ movie }) => {
  const {
    register,
    handleSubmit,
    onSubmit,
    handleFileChange,
    uploadHandler,
    deleteHandler,
    errors,
    uploadedFile,
    fileError,
  } = useMovieItemForm({
    id: movie.id,
    title: movie.title,
  });

  return (
    <li className="flex md:h-[700px] flex-col-reverse items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row overflow-hidden">
      <div className="flex flex-col p-12 w-full md:w-1/3 leading-normal gap-10 min-w-[450px]">
        <div className="flex flex-col w-full divide divide-y-2">
          <div className="py-6">
            <Typography variant="h4" className="mb-4 line-clamp-2">
              {movie.title}
            </Typography>
            <div className="flex flex-row gap-2">
              <Badge variant="gray">🕒 {movie.releaseYear}</Badge>
              {movie.receivedAnOscar && <Badge>🏆 Oscar Winner</Badge>}
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4 py-6">
              <InputWithLabel
                label="Update Title"
                name="updatedMovieTitle"
                error={errors.updatedMovieTitle?.message}
                {...register("updatedMovieTitle")}
              />

              <Button
                label="Update"
                styleType="login"
                type="submit" // Use type="submit" for form submission
                disabled={!!errors.updatedMovieTitle}
              />
            </div>
          </form>
          <div className="flex flex-col gap-4 py-6">
            <div>
              <Typography className="mb-2" variant="label" htmlFor="file">
                {movie.imageUrl ? "Update Image" : "Upload Image"}
              </Typography>
              <input
                type="file"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
            <Button
              label={movie.imageUrl ? "Update Image" : "Upload Image"}
              styleType="google"
              onClick={uploadHandler}
              disabled={!!fileError || !uploadedFile}
            />

            {fileError && <Typography variant="error">{fileError}</Typography>}
          </div>
          <div className="flex flex-col gap-4 py-6">
            <div>
              <Typography className="mb-2" variant="label" htmlFor="file">
                Remove from the list
              </Typography>
              <Button
                label="Delete"
                styleType="error"
                onClick={deleteHandler}
              />
            </div>
          </div>
        </div>
      </div>
      {movie.imageUrl ? (
        <img
          className="object-cover h-full md:w-2/3 bg-slate-300"
          src={movie.imageUrl}
          alt="movie poster"
        />
      ) : (
        <div className="h-full  md:w-2/3 bg-slate-300 flex items-center justify-center">
          <Typography className="text-center" variant="p">
            No image available
          </Typography>
        </div>
      )}
    </li>
  );
};

export default MovieListItem;
