import { Link } from "react-router-dom";

const Nav = () => {
  const token = localStorage.getItem("token");
  return (
    <nav className="titleBar">
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
            <div className="avatar">🧑‍🦱</div>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
