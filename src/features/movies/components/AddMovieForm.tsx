import React, { useState } from "react";
import InputWithLabel from "../../../components/InputWithLabel";
import Button from "../../../components/Button";
import Typography from "../../../components/Typography";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useMovieService from "../hooks/useMovieService";
import { movieSchema } from "../schemas/movieSchema";
import useMovieCrud from "../hooks/useMovieCrud";
import { MovieFormInput } from "../types";

const AddMovieForm = () => {
  const { addMovie } = useMovieCrud();
  const { fetchMovies } = useMovieService();
  const [receivedAnOscar, setReceivedAnOscar] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MovieFormInput>({
    resolver: zodResolver(movieSchema),
  });

  const onSubmit = (data: MovieFormInput) => {
    addMovie(data.title, data.year, receivedAnOscar, fetchMovies);
    reset();
    setReceivedAnOscar(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col md:flex-row flex-wrap items-center gap-6"
    >
      <div className="w-full md:flex-1">
        <InputWithLabel
          label="Add a New Movie to the List"
          name="title"
          placeholder="Enter the movie title"
          error={errors.title?.message}
          {...register("title")}
        />
      </div>

      <div className="w-full md:flex-1">
        <InputWithLabel
          label="Release Year"
          name="year"
          type="number"
          placeholder="Enter the release year"
          error={errors.year?.message}
          {...register("year", { valueAsNumber: true })}
        />
      </div>

      <div className="flex items-center w-full md:w-auto ">
        <input
          id="receivedAnOscar"
          type="checkbox"
          checked={receivedAnOscar}
          onChange={(e) => setReceivedAnOscar(e.target.checked)}
          className="mr-2"
        />
        <Typography variant="label" className="p-0" htmlFor="receivedAnOscar">
          Received an Oscar
        </Typography>
      </div>

      <div className="w-full md:w-auto">
        <Button
          label="Add Movie"
          styleType="login"
          type="submit"
          className="w-full"
          arrow
        />
      </div>
    </form>
  );
};

export default AddMovieForm;
