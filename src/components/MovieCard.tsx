import { IMovie } from "../type";
interface IMovieCard {
  movie: IMovie;
}

const MovieCard: React.FC<IMovieCard> = ({ movie }) => {
  return (
    <div id={movie.id}>
      <img src={movie.image} alt={movie.title} className="card-img" />
      <div className="movie-content">
        <h3>{movie.title}</h3>
        <p>Language: {movie.language}</p>
        <p>Year: {movie.year}</p>
      </div>

      {/* <p>Rating: {movie.rating}</p> */}
    </div>
  );
};

export default MovieCard;
