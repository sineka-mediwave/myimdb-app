import { IMovie } from "../type";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";

interface PaginationMovies {
  movies: IMovie[];
}

const PaginationMovies: React.FC<PaginationMovies> = ({ movies }) => {
  return (
    <div className="movie-cards">
      {movies.map((m) => (
        <div className="movie-card" key={m.id}>
          {/* {rating.map((r) => r.movie_id == m.id)} */}
          <Link to={`/movies/${m.id}`} role="button">
            <MovieCard movie={m} />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PaginationMovies;
