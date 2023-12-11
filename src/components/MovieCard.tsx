import { IMovie } from "../type";

interface IMovieCard {
  movie: IMovie;
}

const MovieCard: React.FC<IMovieCard> = ({ movie }) => {
  return (
    <>
      <img src={movie.image} alt={movie.title} />
      <h3>{movie.title}</h3>
      <p>Language: {movie.language}</p>
      <p>Year: {movie.year}</p>
      {/* <p>Rating: {movie.rating}</p> */}
    </>
  );
};

export default MovieCard;
