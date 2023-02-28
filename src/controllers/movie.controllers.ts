import { Request, Response } from "express";
import {
  createMovieService,
  listMoviesService,
  deleteMovieService,
  updateMovieService,
} from "../services";

const createMovieController = async (req: Request, res: Response) => {
  const movie = await createMovieService(req.body);
  return res.status(201).json(movie);
};

const listMoviesController = async (req: Request, res: Response) => {
  const movies = await listMoviesService(req);
  return res.status(200).json(movies);
};

const updateMovieController = async (req: Request, res: Response) => {
  const movie = await updateMovieService(Number(req.params.id), req.body);
  return res.status(200).json(movie);
};

const deleteMovieController = async (req: Request, res: Response) => {
  await deleteMovieService(Number(req.params.id));
  return res.status(204).send();
};

export {
  createMovieController,
  listMoviesController,
  updateMovieController,
  deleteMovieController,
};
