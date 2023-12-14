import { useState } from "react";
import { IRating } from "../type";
import FormInputs from "./FormInput";
import { Link } from "react-router-dom";
// import FormButtons from "./FormButtons";
interface IRatingForm {
  addRating: (r: IRating) => void;
}

const RatingForm: React.FC<IRatingForm> = ({ addRating }) => {
  const [rating, setRating] = useState<IRating>({
    rating: 0,
    reviews: "",
  });
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setRating({ ...rating, [name]: value === undefined ? "" : value });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (addRating) {
      addRating(rating);
    }
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <>
        <div className="form-input">
          <FormInputs
            label="Star count for Movie"
            type="number"
            name="rating"
            min="0"
            max="5"
            value={rating.rating}
            handleChange={handleChange}
          />
          <FormInputs
            label="Review for the Movie"
            type="text"
            name="reviews"
            value={rating.reviews}
            handleChange={handleChange}
            status={true}
          />
        </div>

        <div className="flex-box">
          <button type="submit" className="form-btn">
            Add
          </button>
          <Link to="/" role="button">
            Back
          </Link>
        </div>
      </>
    </form>
  );
};

export default RatingForm;
