import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { deleteEnlaceService } from "../comunicaciones";
import { AuthContext } from "../context/AuthContext";
import { voteEnlaceService } from "../comunicaciones";
import { deleteVotoService } from "../comunicaciones";
import "./Enlace.css";

export const Enlace = ({ enlace, removeEnlace, addVoto, voto, setRefres }) => {
  const { user, token } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate("");

  const deleteEnlace = async (id) => {
    try {
      await deleteVotoService({ id, token });

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
  const voteEnlace = async (e, id) => {
    e.preventDefault();
    try {
      await voteEnlaceService({ id, token });
      setRefres(true);
      addVoto(voto);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <article className="enlace">
      <div className="dark">
        <h1>Título:{enlace.title}</h1>
      </div>
      {enlace.image ? (
        <img
          src={`${process.env.REACT_APP_BACKEND}/upload/${enlace.image}`}
          alt={enlace.text}
        />
      ) : null}
      <nav>
        <a href={enlace.url} target="_blank" rel="noreferrer">
          {enlace.url}
        </a>
      </nav>
      <h2>Descripción:{enlace.text}</h2>
      <p>
        <Link to={`/user/${enlace.user_id}`}>
          {" "}
          {enlace.name}&nbsp;{enlace.surname}
        </Link>{" "}
        {new Date().toLocaleDateString()}
      </p>
      <div>
        <button id="btn" onClick={(e) => voteEnlace(e, enlace.id)}>
          me gusta {!voto ? enlace.votos : voto}
        </button>
        {user && user.id === enlace.user_id ? (
          <section>
            <button id="btn1" onClick={() => deleteEnlace(enlace.id)}>
              Borrar Enlace
            </button>
            {error ? <p>{error}</p> : null}
          </section>
        ) : null}
      </div>
    </article>
  );
};
