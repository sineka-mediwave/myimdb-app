import Layout from "../components/Layout";
import MovieForm from "../components/MovieForm";
import Model from "../components/Model";
import { addMovie } from "../services/api";
import { IMovie, IShowError } from "../type";
import { useState } from "react";

const AddMovie = () => {
  let [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showModalMsg, setShowModalMsg] = useState<IShowError>({
    action: "",
    msg: "",
  });

  async function handleAdd(m: IMovie) {
    try {
      const moviePayload = {
        image: m.image,
        title: m.title,
        story: m.story,
        language: m.language,
        year: m.year,
      };
      await addMovie(moviePayload);
      setShowModalMsg({
        action: "Succes",
        msg: "Movie successfully Added",
      });
    } catch (error: any) {
      console.log(error);
      setMessage(error.response.data.message[0]);

      if (error instanceof Error) {
        setShowModalMsg({
          action: "Failed",
          msg: error.message,
        });
      }
    } finally {
      setShowModal(true);
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
