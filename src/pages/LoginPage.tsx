import Layout from "../components/Layout";
import UserForm from "../components/SignupForm";
import Model from "../components/Model";
import { Link } from "react-router-dom";
import { IUserData, IShowError } from "../type";
import { useState } from "react";
import { getUser } from "../services/api";

const Login = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModalMsg, setShowModalMsg] = useState<IShowError>({
    action: "",
    msg: "",
  });

  async function handleAdd(u: IUserData) {
    try {
      const userPayload = {
        email: u.email,
        user_password: u.user_password,
      };
      const response = await getUser(userPayload);
      console.log(response.data);
      setShowModalMsg({
        action: "Succes",
        msg: "Welcome",
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
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
      <Layout title="Login">
        <h2>LOGIN</h2>
        <div className="form-cover">
          <UserForm type="login" addUser={handleAdd} />
          <Link to="/signup" role="button" className="form-button">
            create new account
          </Link>
        </div>
      </Layout>
      {showModal && <Model showModalMsg={showModalMsg} />}
    </>
  );
};

export default Login;
