import { Router } from "express";
import {
  createMovieController,
  deleteMovieController,
  listMoviesController,
  updateMovieController,
} from "../controllers/movie.controllers";
import checkBodyRequest from "../middlewares/checkBodyReq.middleware";
import { checkIfMovieExists } from "../middlewares/checkIDIfExists.middleware";
import {
  createMovieSchema,
  movieSchema,
  updateMovieSchema,
} from "../schemas/movie.schemas";

const movieRoutes: Router = Router();

movieRoutes.post(
  "",
  checkBodyRequest(createMovieSchema),
  createMovieController
);
movieRoutes.get("", listMoviesController);
movieRoutes.patch(
  "/:id",
  checkIfMovieExists,
  checkBodyRequest(updateMovieSchema),
  updateMovieController
);
movieRoutes.delete("/:id", checkIfMovieExists, deleteMovieController);

export default movieRoutes;
