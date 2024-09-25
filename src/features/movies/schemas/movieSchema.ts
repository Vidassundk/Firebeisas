import { z } from "zod";

export const movieSchema = z.object({
  title: z.string().min(1, { message: "Movie title is required" }),
  year: z
    .number({
      invalid_type_error: "Year must be a number",
    })
    .min(1900, { message: "Year must be greater than or equal to 1900" })
    .max(new Date().getFullYear(), { message: "Year cannot be in the future" }),
});

export const movieTitleSchema = z.object({
  updatedMovieTitle: z.string().min(1),
});
