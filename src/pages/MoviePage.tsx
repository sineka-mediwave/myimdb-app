import { Link, useNavigate, useParams } from "react-router-dom";
import { IRating, IgetMovie } from "../type";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { addRating, deleteMovieApi, getMovie } from "../services/api";
import { Rating } from "react-simple-star-rating";
import editIcon from "../assets/edit_1827933.png";

// const Rating = require('react-rating');
const MoviePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<IgetMovie>({
    image: "",
    title: "",
    story: "",
    language: "",
    year: 0,
  });
  let [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);

  // // Catch Rating value
  const handleRating = (rate: number) => {
    setRating(rate);
    AddRating(rate);
  };

  // useEffect(() => {
  const deleteMovie = async (id: string | undefined) => {
    try {
      if (id) {
        await deleteMovieApi(id);
        navigate("/");
      }
    } catch (error: any) {
      if (error) {
        console.log(error);
      }
      setMessage(error.response.data.message || error.message.data.message[0]);
    }
  };
  // }, []);

  const handleDelete = () => {
    console.log("delete");
    deleteMovie(id);
  };

  async function AddRating(r: number) {
    try {
      const ratingPayload: IRating = { rating: r };
      if (id) {
        await addRating(ratingPayload, id);
      }
    } catch (error: any) {
      if (error) {
        setMessage(error.response.data.message[0]);
      }
    }
  }

  useEffect(() => {
    const singleMovie = async (id: string | undefined) => {
      try {
        if (id) {
          const res = await getMovie(id);
          setMovie(res.data);
        }
      } catch (error: any) {
        setMessage(error.response.data.message[0]);
      }
    };
    singleMovie(id);
  }, [rating]);

  return (
    <Layout title="single movie">
      <div className="movie-cover">
        {movie && (
          <>
            <h2>{movie.title}</h2>
            <img
              src={`http://localhost:3456/uploads/${movie.image}`}
              alt={movie.title}
              className="card-img"
            />
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
              <Link to="/update/:id" role="button">
                <img
                  src={editIcon}
                  alt="edit"
                  className=" icon-size button-icon"
                />
              </Link>

              <Link to="/">Back</Link>
              <Rating onClick={handleRating} />
              <button onClick={handleDelete}>delete</button>
            </div>
          </>
        )}

        {message && <p className="error">{message}</p>}
      </div>
    </Layout>
  );
};

export default MoviePage;
