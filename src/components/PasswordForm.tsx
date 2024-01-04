import { useState } from "react";
import { IChangePassword } from "../type";
import FormInputs from "./FormInput";
// import FormButtons from "./FormButtons";
interface IPasswordFrom {
  type: string;
  addPassword?: (p: IChangePassword) => void;
  sendMail?: (e: string) => void;
}

const PasswordForm: React.FC<IPasswordFrom> = ({
  type,
  addPassword,
  sendMail,
}) => {
  const [password, setPassword] = useState<IChangePassword>({
    oldPassword: "",
    newPassword: "",
  });

  const [email, setEmail] = useState("");
  let [message, setMessage] = useState("");

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
    if (addPassword && password) {
      addPassword(password);
    } else if (sendMail && email) {
      sendMail(email);
    }
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="form-cover">
      <>
        {type == "Send email" ? (
          <div className="form-input">
            <FormInputs
              label="Enter email ID"
              type="email"
              name="email"
              value={email}
              handleChange={(e) => setEmail(e.target.value)}
            />
          </div>
        ) : (
          <>
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
          </>
        )}
        {message && <p className="error">{message}</p>}
      </>

      <button type="submit" className="form-btn">
        {type}
      </button>
    </form>
  );
};

export default PasswordForm;
