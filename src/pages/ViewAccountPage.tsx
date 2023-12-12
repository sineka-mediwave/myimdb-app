import { Link } from "react-router-dom";

import Layout from "../components/Layout";
import { getUser } from "../services/api";
import { useEffect, useState } from "react";
import { IUserData } from "../type";

const Account = () => {
  let [user, setUser] = useState<IUserData>({
    first_name: "",
    last_name: "",
    user_name: "",
    email: "",
  });
  let [message, setMessage] = useState("");

  useEffect(() => {
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
  }, []);

  return (
    <Layout title="view Account">
      <h2>Welcome, {user.first_name}</h2>
      <div className="account-card">
        <div className="bottom-line">
          <p>First Name: </p>
          <span>{user.first_name}</span>
        </div>
        <div className="bottom-line">
          <p>Last Name: </p>
          <span>{user.last_name}</span>
        </div>
        <div className="bottom-line">
          <p>Last Name: </p>
          <span>{user.last_name}</span>
        </div>
        <div className="bottom-line">
          <p>User Name: </p>
          <span>{user.user_name}</span>
        </div>
        <div className="bottom-line">
          <p>email ID: </p>
          <span>{user.email}</span>
        </div>
      </div>
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
