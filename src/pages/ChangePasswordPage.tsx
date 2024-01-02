import { Link } from "react-router-dom";

import Layout from "../components/Layout";
import FormInputs from "../components/FormInput";
import { IShowError, IUserPassword } from "../type";
import { useState } from "react";
import { updateUserPassword } from "../services/api";
import Modal from "../components/Model";

const ChangePasswordPage = () => {
  const [password, setPassword] = useState<IUserPassword>({
    oldPassword: "",
    newPassword: "",
  });
  let [message, setMessage] = useState("");
  let [showModel, setShowModel] = useState<IShowError>();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setPassword({ ...password, [name]: value === undefined ? "" : value });
  }

  function ValidatePassword(e: React.ChangeEvent<HTMLInputElement>) {
    e.target.value != password.newPassword
      ? setMessage("password does not match")
      : setMessage("");
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleUpdate(password);
  }

  const handleUpdate = async (p: IUserPassword) => {
    try {
      const res = await updateUserPassword(p);
      setShowModel({ action: "success", msg: res.data });
    } catch (error: any) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <Layout title="error">
      <h2>change Password</h2>
      <form onSubmit={(e) => handleSubmit(e)} className="form-cover">
        <FormInputs
          label="Enter old password"
          type="text"
          name="oldPassword"
          min="8"
          max="20"
          value={password.oldPassword}
          handleChange={handleChange}
        />
        <FormInputs
          label="Enter new password"
          type="text"
          name="newPassword"
          min="8"
          max="20"
          value={password.newPassword}
          handleChange={handleChange}
        />
        <FormInputs
          label="Confirm password"
          type="text"
          name="confirm_password"
          min="8"
          max="20"
          handleChange={ValidatePassword}
        />
        {message && <p className="error">{message}</p>}
        <button>update</button>
      </form>
      <Link to="/">Go back to home?</Link>
      {showModel && <Modal showModalMsg={showModel} />}
    </Layout>
  );
};

export default ChangePasswordPage;
