import { z } from "zod";
import {
  movieSchema,
  createMovieSchema,
  readMoviesSchema,
} from "../schemas/movie.schemas";

type MovieType = z.infer<typeof movieSchema>;

interface iMovie {
  id?: number;
  name: string;
  description?: string | null | undefined;
  duration: number;
  price: number;
}

interface iPagination {
  prevPage: string | null;
  nextPage: string | null;
  count: number;
  data: iMovie[];
}

type MovieCreate = z.infer<typeof createMovieSchema>;
type ListMovies = z.infer<typeof readMoviesSchema>;

export { MovieType, iMovie, MovieCreate, iPagination, ListMovies };
