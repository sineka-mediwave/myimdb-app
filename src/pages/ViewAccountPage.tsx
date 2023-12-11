import { Link } from "react-router-dom";

import Layout from "../components/Layout";

const NotfoundPage = () => {
  return (
    <Layout title="view Account">
      <h2>account</h2>
      <Link to="/">Go back to home?</Link>
    </Layout>
  );
};

export default NotfoundPage;
