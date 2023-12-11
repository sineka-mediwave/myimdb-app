import { Link } from "react-router-dom";

import Layout from "../components/Layout";

const NotfoundPage = () => {
  return (
    <Layout title="error">
      <h2>Page not found</h2>
      <Link to="/">Go back to home?</Link>
    </Layout>
  );
};

export default NotfoundPage;
