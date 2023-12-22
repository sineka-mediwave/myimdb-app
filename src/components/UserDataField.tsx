import { useState } from "react";

interface IFormInput {
  user: string | undefined;
  label: string;
  type: string;
  name: string;
  min?: string;
  max?: string;
  value?: string | number | undefined;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
  handleChange,
  handleUpdate,
}) => {
  let [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle(!toggle);
    if (toggle) {
      handleUpdate();
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
            placeholder={user}
          />
        ) : (
          <span onClick={handleToggle}>{user}</span>
        )}
      </div>
    </>
  );
};

export default UserDataField;
