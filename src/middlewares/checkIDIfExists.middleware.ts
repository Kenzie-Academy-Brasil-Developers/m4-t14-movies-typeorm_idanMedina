import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import Movie from "../entities/movie.entity";
import { AppError } from "../errors";

const checkIfMovieExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const id: number = Number(req.params.id);
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);
  const findMovie = await movieRepository.findOne({
    where: { id: id },
  });
  console.log(findMovie);
  if (!findMovie) {
    throw new AppError("Movie not found", 404);
  }

  return next();
};
export { checkIfMovieExists };
