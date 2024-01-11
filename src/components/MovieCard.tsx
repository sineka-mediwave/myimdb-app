import { useEffect, useState } from "react";
import { IMovie } from "../type";
interface IMovieCard {
  movie: IMovie;
}

const MovieCard: React.FC<IMovieCard> = ({ movie }) => {
  const [overallRating, setOverallRating] = useState("");

  useEffect(() => {
    const arr = movie?.rating;
    if (arr) {
      const ratings = arr.map((r) => r.rating);
      const count = ratings.length;
      let sum = 0;
      for (let i = 0; i < count; i++) {
        sum += ratings[i];
      }
      const avg = count > 0 ? sum / count : 0;
      setOverallRating((Math.round(avg * 100) / 100).toFixed(2));
    }
  }, []);

  return (
    <div id={movie.id}>
      <img
        src={`http://localhost:3456/uploads/${movie.image}`}
        alt={movie.title}
        className="card-img"
      />
      <div className="movie-content">
        <h3>{movie.title}</h3>
        <p>Language: {movie.language}</p>
        <p>Year: {movie.year}</p>
        <p>Rating:{overallRating}</p>
      </div>
    </div>
  );
};

export default MovieCard;
