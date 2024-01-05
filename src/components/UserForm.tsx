import { useState } from "react";
import { IUserData } from "../type";
import FormInputs from "./FormInput";
import { Link } from "react-router-dom";
// import FormButtons from "./FormButtons";
interface IForm {
  type: string;
  addUser: (u: IUserData) => void;
}

const UserForm: React.FC<IForm> = ({ type, addUser }) => {
  const [user, setUser] = useState<IUserData>({
    first_name: "",
    last_name: "",
    user_name: "",
    email: "",
    user_password: "",
  });
  let [message, setMessage] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value === undefined ? "" : value });
  }

  function ValidatePassword(e: React.ChangeEvent<HTMLInputElement>) {
    e.target.value != user.user_password
      ? setMessage("password does not match")
      : setMessage("");
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    addUser(user);
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <>
        <div className="form-input">
          <FormInputs
            label="Enter email ID"
            type="email"
            name="email"
            value={user.email}
            handleChange={handleChange}
          />
          <FormInputs
            label="Enter your password"
            type="password"
            name="user_password"
            min="8"
            max="20"
            value={user.user_password}
            handleChange={handleChange}
          />
          {type == "login" && (
            <Link to="/forgetPassword" role="button">
              Forget password?
            </Link>
          )}
        </div>
        {type == "signup" && (
          <>
            <FormInputs
              label="Confirm password"
              type="password"
              name="confirm_password"
              min="8"
              max="20"
              handleChange={ValidatePassword}
            />

            {message && <p className="error">{message}</p>}
            <FormInputs
              label="Enter First name"
              type="text"
              name="first_name"
              value={user.first_name}
              handleChange={handleChange}
            />
            <FormInputs
              label="Enter Last name"
              type="text"
              name="last_name"
              value={user.last_name}
              handleChange={handleChange}
            />
            <FormInputs
              label="Enter User name"
              type="text"
              name="user_name"
              value={user.user_name}
              handleChange={handleChange}
            />
          </>
        )}

        <div className="form-input home-bar">
          <button type="submit" className="form-btn">
            {type}
            {/* {type == "login" ? <>Login</> : <>SignUp</>} */}
          </button>
          <p>or</p>
        </div>
      </>
    </form>
  );
};

export default UserForm;
