import { Router } from "express";
import { createMovieController, listMoviesController } from "../controllers/movie.controllers";
import checkBodyRequest from "../middlewares/checkBodyReq.middleware";
import { createMovieSchema } from "../schemas/movie.schemas";

const movieRoutes: Router = Router();

movieRoutes.post("",checkBodyRequest(createMovieSchema), createMovieController)
movieRoutes.get("",listMoviesController)
movieRoutes.patch("/:id",)
movieRoutes.delete("/:id",)

export default movieRoutes;
