import { Link } from "react-router-dom";

import Layout from "../components/Layout";
import { getUser } from "../services/api";
import { useState } from "react";
import { IUserData } from "../type";

const Account = () => {
  let [user, setUser] = useState<IUserData>({
    first_name: "",
    last_name: "",
    user_name: "",
    email: "",
  });
  let [message, setMessage] = useState("");

  const viewAccount = async () => {
    try {
      const res = await getUser();
      setUser(res.data);
    } catch (error: any) {
      console.log(error);
      setMessage(error.response.data.message);
    }
  };

  viewAccount();
  return (
    <Layout title="view Account">
      <h2>Welcome, {user.first_name}</h2>
      {message && (
        <>
          <p>{message}</p>
          <Link to="/login">First, login</Link>
        </>
      )}
    </Layout>
  );
};

export default Account;
