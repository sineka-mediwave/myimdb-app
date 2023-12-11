import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="titleBar">
      <h1>MYiMDB</h1>
      <ul className="navBar">
        {/* <li>
          <Link to="/signup">SignUp</Link>
        </li> */}
        <li>
          <Link to="/login">LogIn</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
