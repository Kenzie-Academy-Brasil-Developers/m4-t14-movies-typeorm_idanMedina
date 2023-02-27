import { z } from "zod";

const movieSchema = z.object({
  id: z.number(),
  name: z.string().min(1).max(50),
  description: z.string().max(255).nullable().optional(),
  duration: z.number().int().positive(),
  price: z.number().int().nonnegative(),
});

const createMovieSchema = movieSchema.omit({ id: true });

const listMoviesSchema = z.array(movieSchema);

const readMoviesSchema = z.object({
  prevPage: z.string().nullable(),
  nextPage: z.string().nullable(),
  count: z.number(),
  data: listMoviesSchema,
});

export { movieSchema, createMovieSchema, listMoviesSchema, readMoviesSchema };
