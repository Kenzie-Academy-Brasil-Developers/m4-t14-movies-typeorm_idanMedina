import { AppDataSource } from "../data-source";
import { Movie } from "../entities/movie.entity";
import { movieSchema, readMoviesSchema } from "../schemas/movie.schemas";
import { ListMovies, MovieCreate } from "../interfaces/movie.interfaces";

const createMovieService = async (payload: MovieCreate): Promise<Movie> => {
  const movieRepository = AppDataSource.getRepository(Movie);
  const movie = movieRepository.create(payload);

  await movieRepository.save(movie);

  const newMovie = movieSchema.parse(movie);
  return newMovie;
};

const listMoviesService = async (payload: any): Promise<Movie[]> => {
  const movieRepository = AppDataSource.getRepository(Movie);
  const page: number = Number(payload.page) || 1;
  const perPage: number = Number(payload.perPage) || 5;

  const findMovies: ListMovies = await movieRepository.find({
    take: perPage,
    skip:perPage*(page -1),
    order:{
      id:'ASC'
    }
  });

  const listMovies = readMoviesSchema.parse(findMovies);

  return listMovies;
};

export { createMovieService, listMoviesService };
