import { useState } from "react";
import { updateUser } from "../services/api";
import { IUserData } from "../type";

interface IFormInput {
  user: IUserData;
  label: string;
  type: string;
  name: string;
  min?: string;
  max?: string;
  value?: string | number | undefined;
  handleUpdate: () => void;
}
const UserDataField: React.FC<IFormInput> = ({
  label,
  type,
  name,
  value,
  min,
  max,
  user,
  handleUpdate,
}) => {
  let [toggle, setToggle] = useState(false);
  let [user, setUser] = useState<IUserData>({
    first_name: user.first_name,
    last_name: "",
    user_name: "",
    email: "",
  });
  let [message, setMessage] = useState("");
  let [update, setupdate] = useState();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value === undefined ? "" : value });
  };

  const handleUpdateUser = async (u: IUserData) => {
    try {
      const userPayload = {
        first_name: u.first_name,
        last_name: u.last_name,
        user_name: u.user_name,
        email: u.email,
        user_password: u.user_password,
      };
      const res = await updateUser(userPayload);
      console.log(res);
    } catch (error: any) {
      setMessage(error.response.data.message);
      if (error instanceof Error) {
        console.error("Error deleting movie:", error);
      }
    }
  };
  const handleToggle = () => {
    setToggle(!toggle);
    if (toggle) {
      handleUpdateUser(user);
    }
  };
  return (
    <>
      <div className="bottom-line">
        <p>{label}</p>
        {toggle ? (
          <input
            type={type}
            id={name}
            name={name}
            value={value}
            min={min}
            max={max}
            onChange={(e) => handleChange(e)}
            onBlur={handleToggle}
            // placeholder={user}
          />
        ) : (
          <span onClick={handleToggle}>{user}</span>
        )}
      </div>
    </>
  );
};

export default UserDataField;
