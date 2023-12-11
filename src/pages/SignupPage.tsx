import Layout from "../components/Layout";
import UserForm from "../components/SignupForm";
import { Link, useNavigate } from "react-router-dom";
import { IUserData } from "../type";
import { addUser } from "../services/api";
import { useState } from "react";

const Signup = () => {
  const navigate = useNavigate();
  let [message, setMessage] = useState("");
  async function handleAdd(u: IUserData) {
    try {
      const userPayload = {
        first_name: u.first_name,
        last_name: u.last_name,
        user_name: u.user_name,
        email: u.email,
        user_password: u.user_password,
      };
      const response = await addUser(userPayload);
      console.log(response);
      setMessage(response.data.message);
      navigate("/login");
    } catch (error: any) {
      setMessage(error.response.data.message[0]);
      //   console.log(error.response.data.message[0]);
      console.log(error.response.data.message);
    }
  }

  return (
    <>
      <Layout title="Login">
        <h2>SIGNUP</h2>
        <div className="form-cover">
          <UserForm type="signup" addUser={handleAdd} />
          {message && <p>{message}</p>}
          <Link to="/login" role="button" className="form-button">
            Login account
          </Link>
        </div>
      </Layout>
    </>
  );
};

export default Signup;
