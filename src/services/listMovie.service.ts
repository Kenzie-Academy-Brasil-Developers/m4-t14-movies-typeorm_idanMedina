import { AppDataSource } from "../data-source";
import Movie from "../entities/movie.entity";
import { ListMovies, ReadMovies } from "../interfaces/movie.interfaces";
import { listMoviesSchema } from "../schemas/movie.schemas";

const listMoviesService = async (payload: any): Promise<ReadMovies> => {
  const movieRepository = AppDataSource.getRepository(Movie);
  let page: number = Number(payload.query.page) || 1;
  let perPage: number = Number(payload.query.perPage) || 5;

  if (page <= 0 && !Number.isInteger(page)) {
    page = 1;
  }

  if (perPage > 5) {
    perPage = 5;
  }

  /*  if(payload.query.sort !== "price" || payload.query.sort !== "duration"){
      payload.query.sort = "id"
    }
    if(payload.query.order !== "DESC"){
      payload.query.order = "ASC"
    } */

  const findMovies: ListMovies = await movieRepository.find({
    take: perPage,
    skip: perPage * (page - 1),
    order: {
      id: "ASC",
    },
  });
  const allMovies: ListMovies = await movieRepository.find();
  const listMovies = listMoviesSchema.parse(findMovies);

  const baseUrl: string = `http://localhost:3000/movies`;
  let prevPage: string | null = `${baseUrl}?page=${
    page - 1
  }&perPage=${perPage}`;

  let nextPage: string | null = `${baseUrl}?page=${
    page + 1
  }&perPage=${perPage}`;

  if (page <= 1) {
    prevPage = null;
  }

  const lastMovieID = allMovies[allMovies.length - 1].id;
  const includeLastMovie = listMovies.some((movie) => movie.id === lastMovieID);

  if (includeLastMovie) {
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

export default listMoviesService;
