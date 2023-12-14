import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { IMovie } from "../type";
import { getMovies } from "../services/api";
import { Link } from "react-router-dom";
// import Loading from "../components/Loading";
import MovieCard from "../components/MovieCard";
// import Home from "../components/Movies";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState<IMovie[]>([]);
  // const [rating, setRating] = useState([]);

  useEffect(() => {
    async function getMoviesFromAPI() {
      try {
        setIsLoading(true);
        const response = await getMovies();
        console.log(response.data);
        setMovies(response.data);
        // setRating(response.data.overallRating);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
    getMoviesFromAPI();
  }, []);

  return (
    <Layout title="MyIMDb">
      {isLoading ? (
        <p>Loading Movies..</p>
      ) : (
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
      )}
    </Layout>
  );
};

export default Home;
