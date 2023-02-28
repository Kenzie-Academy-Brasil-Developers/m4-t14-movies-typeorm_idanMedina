import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";
import { AppDataSource } from "../data-source";
import Movie from "../entities/movie.entity";
import { AppError } from "../errors";

const checkBodyRequest =
  (schema: ZodTypeAny) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (req.method === "POST" || req.method === "PATCH") {
      const movieRepository = AppDataSource.getRepository(Movie);
      const findMovie = await movieRepository.findOne({
        where: {
          name: req.body.name,
        },
      });
      if (findMovie) {
        throw new AppError("Movie already exists", 409);
      }
    }

    const check = schema.parse(req.body);
    req.body = check;

    return next();
  };

export default checkBodyRequest;
