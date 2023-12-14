import { Link, useParams } from "react-router-dom";
import { IgetMovie } from "../type";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { getMovie } from "../services/api";

const MoviePage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<IgetMovie>({
    image: "",
    title: "",
    story: "",
    language: "",
    year: 0,
  });
  let [message, setMessage] = useState("");

  useEffect(() => {
    const singleMovie = async (id: string | undefined) => {
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
        <img src={movie.image} alt={movie.title} className="card-img" />
        <div className="movie-content">
          <p>Description: {movie.story}</p>
          <p>Language: {movie.language}</p>
          <p>Year: {movie.year}</p>
          <p>added By: {movie?.addedBy?.first_name}</p>
          {movie.rating?.map((r, i) => (
            <div key={i} className="rating-box">
              <p>Rated By: {r.userRating.user_name}</p>
              <p>Rating: {r.rating}</p>
            </div>
          ))}
        </div>
        <div className="flex-box">
          <Link to="/">Back</Link>
          <Link to="/addRating">addRating</Link>
        </div>
      </div>
    </Layout>
  );
};

export default MoviePage;
