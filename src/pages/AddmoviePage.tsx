import Layout from "../components/Layout";
import MovieForm from "../components/MovieForm";
import Model from "../components/Model";
import { addMovie } from "../services/api";
import { IShowError } from "../type";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddMovie = () => {
  const navigate = useNavigate();
  let [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showModalMsg, setShowModalMsg] = useState<IShowError>({
    action: "",
    msg: "",
  });

  async function handleAdd(movie: FormData) {
    try {
      // const moviePayload = {
      //   image: m.image,
      //   title: m.title,
      //   story: m.story,
      //   language: m.language,
      //   year: m.year,
      // };
      await addMovie(movie);
      setShowModalMsg({
        action: "Succes",
        msg: "Movie successfully Added",
      });
    } catch (error: any) {
      setMessage(error.message || error.response.data.message[0]);

      if (error instanceof Error) {
        setShowModalMsg({
          action: "Failed",
          msg: error.message,
        });
      }
    } finally {
      setShowModal(true);
      navigate("/");
    }
  }
  return (
    <>
      <Layout title="movieForm">
        <h2>Add Movie</h2>
        <MovieForm type="add" addingMovie={handleAdd} />
        {message && <p>{message}</p>}
      </Layout>
      {showModal && <Model showModalMsg={showModalMsg} />}
    </>
  );
};

export default AddMovie;
