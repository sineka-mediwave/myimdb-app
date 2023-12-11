import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { IMovie } from "../type";
import { getMovies } from "../services/api";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import MovieCard from "../components/MovieCard";
// import Home from "../components/Movies";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [movies, setMovies] = useState<IMovie[]>([]);

  useEffect(() => {
    async function getMoviesFromAPI() {
      setIsLoading(true);

      try {
        const response = await getMovies();
        setMovies(response.data);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
    getMoviesFromAPI();
  }, [movies]);
  return (
    <Layout title="MyIMDb">
      {isLoading ? (
        <p>Loading Movies..</p>
      ) : (
        <div className="gridBox">
          {movies.map((m, i) => (
            <div className="movie-card" key={i}>
              <MovieCard movie={m} />
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Home;
