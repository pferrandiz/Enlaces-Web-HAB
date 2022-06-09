import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const Auth = () => {
  const { user, logout } = useContext(AuthContext);
  return user ? (
    <p>
      {user.email} <button onClick={() => logout()}>Cerrar Sesión</button>
    </p>
  ) : (
    <ul>
      <li>
        <Link to={"/register"}>Registrarse</Link>
      </li>
      <li>
        <Link to={"/login"}>Iniciar Sesión</Link>
      </li>
    </ul>
  );
};
