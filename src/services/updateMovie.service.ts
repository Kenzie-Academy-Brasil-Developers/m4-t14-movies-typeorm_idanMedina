import { AppDataSource } from "../data-source";
import { Movie } from "../entities/movie.entity";
import { movieSchema } from "../schemas/movie.schemas";
import { updateMovie } from "../interfaces/movie.interfaces";

const updateMovieService = async (
  id: number,
  body: updateMovie
): Promise<Movie> => {
  const movieRepository = AppDataSource.getRepository(Movie);
  const movie = await movieRepository.findOneBy({ id: id });

  const patchMovie = movieRepository.create({
    ...movie,
    ...body,
  });

  await movieRepository.save(patchMovie);
  const updateMovie = movieSchema.parse(patchMovie);

  return updateMovie;
};

export default updateMovieService;
