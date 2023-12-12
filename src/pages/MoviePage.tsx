import { Link } from "react-router-dom";

import Layout from "../components/Layout";

const MoviePage = () => {
  return (
    <Layout title="single movie">
      <h2>Movie</h2>
      <Link to="/">Go back to home?</Link>
    </Layout>
  );
};

export default MoviePage;
