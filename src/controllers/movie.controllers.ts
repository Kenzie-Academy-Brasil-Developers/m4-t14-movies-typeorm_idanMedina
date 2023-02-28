import { Request, Response } from "express";
import {
  createMovieService,
  listMoviesService,
} from "../services";
import deleteMovieService from "../services/deleteMovie.service";

const createMovieController = async (req: Request, res: Response) => {
  const movie = await createMovieService(req.body);
  return res.status(201).json(movie);
};

const listMoviesController = async (req: Request, res: Response) => {
  const movies = await listMoviesService(req);

  return res.status(200).json(movies);
};

const deleteMovieController = async (req: Request, res: Response) => {
  const movies = await deleteMovieService(Number(req.params.id));

  return res.status(204).json();
};

export { createMovieController, listMoviesController, deleteMovieController };
