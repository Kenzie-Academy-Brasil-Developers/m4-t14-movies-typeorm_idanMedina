import { DeepPartial, Repository } from 'typeorm';
import { z } from 'zod';
import { Movie } from '../../entities/movie.entity';
import { createMovieSchema } from '../../schemas/movie.schemas';

type iCreateMovie = z.infer<typeof createMovieSchema>;
type iMovieUpdate = DeepPartial<Movie>;
type iMovieRepo = Repository<Movie>;

export { iCreateMovie, iMovieUpdate, iMovieRepo };