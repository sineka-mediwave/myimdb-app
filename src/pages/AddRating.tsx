import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import RatingForm from "../components/RatingForm";
import { useState } from "react";
import { addRating } from "../services/api";
import { IRating } from "../type";

const AddRating = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  let [message, setMessage] = useState("");
  //   let [rating, setRating] = useState(0);

  async function handleAdd(r: IRating) {
    try {
      const ratingPayload = { rating: r.rating, movie_id: id };
      if (id) {
        await addRating(ratingPayload, id);
      }
      navigate(`/movies/${id}`);
    } catch (error: any) {
      console.log(error);
      setMessage(error.response.data.message[0]);
    }
  }

  //   useEffect(() => {
  //     const addRatingApi = async (id: string | undefined, r: IRating) => {
  //       try {
  //         const ratingPayload = r.rating;
  //         if (id) {
  //           const res = await addRating(id, ratingPayload);
  //           console.log(res);
  //         }
  //       } catch (error: any) {
  //         console.log(error);
  //         setMessage(error.response.data.message);
  //         console.log(message);
  //       }
  //     };
  //     addRatingApi(id, rating);
  //   }, [id]);
  return (
    <Layout title="rating form">
      <h2>Add Rating</h2>
      <div className="form-cover">
        <RatingForm addRating={handleAdd} />
        {message && <p>{message}</p>}
      </div>
    </Layout>
  );
};

export default AddRating;
