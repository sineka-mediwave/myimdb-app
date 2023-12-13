import { Link, useParams } from "react-router-dom";
import { IMovie } from "../type";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { getMovie } from "../services/api";
import MovieCard from "../components/MovieCard";

const MoviePage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<IMovie>({
    image: "",
    title: "",
    story: "",
    language: "",
    year: 0,
  });
  let [message, setMessage] = useState("");

  useEffect(() => {
    const singleMovie = async (id: string) => {
      try {
        if (id) {
          const res = await getMovie(id);
          setMovie(res.data);
          console.log(res);
        }
      } catch (error: any) {
        console.log(error);
        setMessage(error.response.data.message);
        console.log(message);
      }
    };
    singleMovie(id);
  }, [id]);

  return (
    <Layout title="single movie">
      <div className="movie-cover">
        <h2>{movie.title}</h2>
        <MovieCard movie={movie} />
        <p>Description: {movie.story}</p>
        <p>added By: {movie?.addedBy?.first_name}</p>
        {/* <p>rating: {movie.rating}</p> */}
        <Link to="/">Back</Link>
      </div>
    </Layout>
  );
};

export default MoviePage;
