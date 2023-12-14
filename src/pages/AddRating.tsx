import Layout from "../components/Layout";
import RatingForm from "../components/RatingForm";

const NotfoundPage = () => {
  return (
    <Layout title="rating form">
      <h2>Add Rating</h2>
      <div className="form-cover">
        <RatingForm />
      </div>
    </Layout>
  );
};

export default NotfoundPage;
