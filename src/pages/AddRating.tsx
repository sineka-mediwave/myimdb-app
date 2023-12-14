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
