import { Link } from "react-router-dom";

import Layout from "../components/Layout";
import { getUser, updateUser } from "../services/api";
import { useEffect, useState } from "react";
import { IUserData } from "../type";
import UserForm from "../components/UserForm";

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

  const handleUpdate = async (user: IUserData) => {
    try {
      await updateUser(user);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error deleting movie:", error);
        // setMessage(error.response.data.message);
      }
    }
  };

  return (
    <Layout title="view Account">
      {message ? (
        <p className="error">{message}</p>
      ) : (
        <>
          <UserForm type="signup" addUser={handleUpdate} />
          {message && <p className="error">{message}</p>}
          <Link to="/u/account">Back</Link>
        </>
      )}
    </Layout>
  );
};

export default Account;
