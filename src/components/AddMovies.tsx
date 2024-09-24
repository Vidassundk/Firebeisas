import React from "react";
import InputWithLabel from "./UI/InputWithLabel"; // Your custom input component
import Button from "./UI/Button"; // Your custom button component
import Typography from "./UI/Typography"; // Your custom typography component for labels

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
      {/* Responsive form layout: vertical on smaller screens, horizontal on md and larger */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:flex-row flex-wrap items-center gap-6"
      >
        {/* Movie Title */}
        <div className="w-full md:flex-1">
          <InputWithLabel
            label="Add a New Movie to the List"
            name="title"
            placeholder="Enter the movie title"
            error={errors.title?.message} // Pass error message to InputWithLabel
            {...register("title")}
          />
        </div>
        {/* Movie Year */}
        <div className="w-full md:flex-1">
          <InputWithLabel
            label="Release Year"
            name="year"
            type="number"
            placeholder="Enter the release year"
            error={errors.year?.message} // Pass error message to InputWithLabel
            {...register("year", { valueAsNumber: true })} // Register with value as number
          />
        </div>
        {/* Oscar Checkbox */}
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
        {/* Submit Button */}
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
