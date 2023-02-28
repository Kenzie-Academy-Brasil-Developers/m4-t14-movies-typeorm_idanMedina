import { AppDataSource } from "../data-source";
import { Movie } from "../entities/movie.entity";
import { movieSchema } from "../schemas/movie.schemas";
import { MovieCreate } from "../interfaces/movie.interfaces";

const createMovieService = async (payload: MovieCreate): Promise<Movie> => {
  const movieRepository = AppDataSource.getRepository(Movie);
  const movie = movieRepository.create(payload);

  await movieRepository.save(movie);

  const newMovie = movieSchema.parse(movie);
  return newMovie;
};

export default createMovieService;
