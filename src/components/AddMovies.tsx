import React from "react";
import InputWithLabel from "./UI/InputWithLabel";
import Button from "./UI/Button";
import Typography from "./UI/Typography";

const AddMovies = ({
  register,
  handleSubmit,
  errors,
  receivedAnOscar,
  setReceivedAnOscar,
  onSubmit,
}) => {
  return (
    <div className="p-6 max-w-full rounded-lg bg-slate-100">
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
          />
        </div>
      </form>
    </div>
  );
};

export default AddMovies;
