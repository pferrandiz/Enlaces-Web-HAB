import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { deleteEnlaceService } from "../comunicaciones";
import { AuthContext } from "../context/AuthContext";

export const Enlace = ({ enlace, removeEnlace }) => {
  const { user, token } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate("");
  const deleteEnlace = async (id) => {
    try {
      await deleteEnlaceService({ id, token });
      if (removeEnlace) {
        removeEnlace(id);
      } else {
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <article>
      <p>{enlace.url}</p>
      {enlace.image ? (
        <img
          src={`${process.env.REACT_APP_BACKEND}/upload/${enlace.image}`}
          alt={enlace.text}
        />
      ) : null}
      <p>{enlace.text}</p>
      <p>
        By <Link to={`/user/${enlace.user_id}`}> {enlace.email}</Link> on{""}
        <Link to={`/enlace/${enlace.id}`}>
          {new Date(enlace.created_at).toLocaleString()}
        </Link>
      </p>
      {user && user.id === enlace.user_id ? (
        <section>
          <button onClick={() => deleteEnlace(enlace.id)}>Borrar Enlace</button>
          {error ? <p>{error}</p> : null}
        </section>
      ) : null}
      ;
    </article>
  );
};
