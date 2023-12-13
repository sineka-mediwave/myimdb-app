import { Link } from "react-router-dom";
import avatar from "../assets/free-avatar-370-456322.webp";
const Nav = () => {
  const token = localStorage.getItem("token");
  return (
    <nav className="titleBar flex-box">
      <Link to="/" className="logo">
        MYiMDB
      </Link>

      <ul className="navBar">
        {/* <li>
          <Link to="/signup">SignUp</Link>
        </li> */}
        {token ? (
          <li>
            <Link to="/addMovie">addMovie</Link>
          </li>
        ) : (
          <li>
            <Link to="/login">LogIn</Link>
          </li>
        )}
        <li>
          <Link to="/u/account">
            <img src={avatar} alt="avatar" className="avatar" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
