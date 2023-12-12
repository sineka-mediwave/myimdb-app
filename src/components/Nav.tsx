import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="titleBar">
      <Link to="/" className="logo">
        MYiMDB
      </Link>

      <ul className="navBar">
        {/* <li>
          <Link to="/signup">SignUp</Link>
        </li> */}
        <li>
          <Link to="/login">LogIn</Link>
        </li>
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
