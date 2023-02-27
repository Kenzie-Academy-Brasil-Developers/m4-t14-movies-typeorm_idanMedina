import { AppDataSource } from "../data-source";
import { Movie } from "../entities/movie.entity";
import {
  listMoviesSchema,
  movieSchema,
  readMoviesSchema,
} from "../schemas/movie.schemas";
import {
  ListMovies,
  MovieCreate,
  ReadMovies,
} from "../interfaces/movie.interfaces";

const createMovieService = async (payload: MovieCreate): Promise<Movie> => {
  const movieRepository = AppDataSource.getRepository(Movie);
  const movie = movieRepository.create(payload);

  await movieRepository.save(movie);

  const newMovie = movieSchema.parse(movie);
  return newMovie;
};

const listMoviesService = async (payload: any): Promise<ReadMovies> => {
  const movieRepository = AppDataSource.getRepository(Movie);
  const page: number = Number(payload.query.page) || 1;
  const perPage: number = Number(payload.query.perPage) || 5;

  const findMovies: ListMovies = await movieRepository.find({
    take: perPage,
    skip: perPage * (page - 1),
    order: {
      id: "ASC",
    },
  });
  const allMovies: ListMovies = await movieRepository.find();
  const listMovies = listMoviesSchema.parse(findMovies);

  const baseUrl: string = `http://localhost:3000/movies/`;
  let prevPage: string | null = `${baseUrl}?page=${
    page - 1
  }&perPage=${perPage}`;

  let nextPage: string | null = `${baseUrl}?page=${
    page + 1
  }&perPage=${perPage}`;
  if (page <= 1) {
    prevPage = null;
  }

  if (listMovies.length < 5) {
    nextPage = null;
  }

  const readMovies: ReadMovies = {
    prevPage: prevPage,
    nextPage: nextPage,
    count: allMovies.length,
    data: listMovies,
  };

  return readMovies;
};

export { createMovieService, listMoviesService };
