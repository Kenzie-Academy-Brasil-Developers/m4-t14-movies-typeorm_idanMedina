import {
  FindManyOptions,
  FindOptionsOrder,
  FindOptionsOrderValue,
} from "typeorm";
import { AppDataSource } from "../data-source";
import Movie from "../entities/movie.entity";
import { ListMovies, ReadMovies, Sort } from "../interfaces/movie.interfaces";
import { listMoviesSchema } from "../schemas/movie.schemas";

const listMoviesService = async (payload: any): Promise<ReadMovies> => {
  const movieRepository = AppDataSource.getRepository(Movie);
  let page: number = Number(payload.query.page) || 1;
  let perPage: number = Number(payload.query.perPage) || 5;
  let sort: Sort = payload.query.sort;
  let setOrder: FindOptionsOrderValue | undefined =
    payload.query.order || "ASC";

  if (page <= 0 || !Number.isInteger(page)) {
    page = 1;
  }
  if (perPage > 5 || (perPage !== undefined && perPage <= 0)) {
    perPage = 5;
  }
  if (!sort) {
    sort = "id";
    setOrder = "ASC";
  }

  const findMovies: ListMovies = await movieRepository.find({
    take: perPage,
    skip: perPage * (page - 1),
    order: { [sort]: setOrder },
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

  if (listMovies.length === 0) {
    page = page - 1;
    nextPage = null;
  }

  if (page <= 1) {
    prevPage = null;
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
