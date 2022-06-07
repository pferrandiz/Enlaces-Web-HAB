import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Auth = () => {
  const { logout, user } = AuthContext();
  return user ? (
    <p>
      {user.email} <button onClick={() => logout()}>LogOut</button>
    </p>
  ) : (
    <ul>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );
};

export default Auth;
