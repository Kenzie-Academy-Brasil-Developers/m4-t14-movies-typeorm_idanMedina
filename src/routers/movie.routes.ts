import { Router } from "express";
import {
  createMovieController,
  deleteMovieController,
  listMoviesController,
} from "../controllers/movie.controllers";
import checkBodyRequest from "../middlewares/checkBodyReq.middleware";
import { checkIfMovieExists } from "../middlewares/checkIDIfExists.middleware";
import { createMovieSchema, movieSchema } from "../schemas/movie.schemas";

const movieRoutes: Router = Router();

movieRoutes.post(
  "",
  checkBodyRequest(createMovieSchema),
  createMovieController
);
movieRoutes.get("", listMoviesController);
movieRoutes.patch("/:id", checkIfMovieExists, checkBodyRequest(movieSchema));
movieRoutes.delete("/:id", checkIfMovieExists, deleteMovieController);

export default movieRoutes;
