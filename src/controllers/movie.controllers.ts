import { Request, Response } from "express";
import {
  createMovieService,
  listMoviesService,
} from "../services/movie.service";

const createMovieController = async (req: Request, res: Response) => {
  const movie = await createMovieService(req.body);
  return res.status(201).json(movie);
};

const listMoviesController = async (req: Request, res: Response) => {
  const users = await listMoviesService();
  return res.status(200).json(users);
};

export { createMovieController, listMoviesController };
