import { useState } from "react";
import { IUserData } from "../type";
import FormInputs from "./FormInput";
import { Link } from "react-router-dom";
import Loading from "./Loading";
// import FormButtons from "./FormButtons";
interface IForm {
  type: string;
  addUser?: (u: IUserData) => void;
  //   getMovie?: IUserData;
}

const UserForm: React.FC<IForm> = ({ type, addUser }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState<IUserData>({
    email: "",
    user_password: "",
  });
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value === undefined ? "" : value });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    if (addUser) {
      addUser(user);
      console.log(user);
    }
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <>
        <div className="form-input">
          <FormInputs
            label="Enter email ID"
            type="email"
            name="email"
            handleChange={handleChange}
          />
          <FormInputs
            label="Enter your password"
            type="password"
            name="password"
            min="8"
            max="20"
            handleChange={handleChange}
          />
        </div>
        <div className="form-input home-bar">
          <button type="submit" className="form-btn" disabled={isLoading}>
            {isLoading && <Loading />}
            {type == "login" ? <>Login</> : <>SignUp</>}
          </button>
          <p>or</p>
        </div>
      </>
    </form>
  );
};

export default UserForm;
