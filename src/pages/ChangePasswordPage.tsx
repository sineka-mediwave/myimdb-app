import { Link } from "react-router-dom";

import Layout from "../components/Layout";
import { IShowError, IChangePassword } from "../type";
import { useState } from "react";
import { updateUserPassword } from "../services/api";
import Modal from "../components/Model";
import PasswordForm from "../components/PasswordForm";

const ChangePasswordPage = () => {
  let [showModel, setShowModel] = useState<IShowError>();

  const handleDelete = () => {
    localStorage.setItem("token", "");
  };

  const handleUpdate = async (p: IChangePassword) => {
    try {
      const res = await updateUserPassword(p);
      setShowModel({ action: "success", msg: res.data.message });
      handleDelete();
    } catch (error: any) {
      setShowModel({ action: "success", msg: error.res.data.message });
    }
  };

  return (
    <Layout title="change-password">
      <h2>change Password</h2>
      <PasswordForm type="update password" addPassword={handleUpdate} />
      <Link to="/">Go back to home?</Link>
      {showModel && <Modal showModalMsg={showModel} />}
    </Layout>
  );
};

export default ChangePasswordPage;
