import { Link } from "react-router-dom";

import Layout from "../components/Layout";
import { getUser, updateUser } from "../services/api";
import { useEffect, useState } from "react";
import { IUserData } from "../type";
import UserForm from "../components/UserForm";
// import UserForm from "../components/UserForm";

const Account = () => {
  let [user, setUser] = useState<IUserData>({
    first_name: "",
    last_name: "",
    user_name: "",
    email: "",
  });
  let [message, setMessage] = useState("");
  let [update, setupdate] = useState("");

  const handleDelete = () => {
    localStorage.setItem("token", "");
  };

  useEffect(() => {
    const viewAccount = async () => {
      try {
        const res = await getUser();
        setUser(res.data);
        console.log(res.data);
      } catch (error: any) {
        console.log(error);
        setMessage(error.response.data.message);
      }
    };
    viewAccount();
  }, []);

  const handleUpdate = async (user: IUserData) => {
    try {
      const res = await updateUser(user);
      console.log(res);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error deleting movie:", error);
        // setMessage(error.response.data.message);
      }
    }
  };

  const openUpdate = () => {
    setupdate("update");
  };
  return (
    <Layout title="view Account">
      {message ? (
        <p className="error">{message}</p>
      ) : (
        <>
          {update ? (
            <div className="form-cover">
              <UserForm type="update" addUser={handleUpdate} />
            </div>
          ) : (
            <>
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
                  <p>User Name: </p>
                  <span>{user.user_name}</span>
                </div>
                <div className="bottom-line">
                  <p>email ID: </p>
                  <span>{user.email}</span>
                </div>
                <div className="flex-box">
                  <Link to="/" role="button">
                    Back
                  </Link>
                  <button onClick={openUpdate}>✏️</button>
                  <Link to="/login" role="button" onClick={handleDelete}>
                    Logout
                  </Link>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </Layout>
  );
};

export default Account;
