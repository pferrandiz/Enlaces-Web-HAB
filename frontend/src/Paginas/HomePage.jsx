import { useContext } from "react";
import { ErrorMessage } from "../components/ErrorMessage";
import { NewEnlace } from "../components/NewEnlace";
import { ListEnlaces } from "../components/ListEnlaces";
import { AuthContext } from "../context/AuthContext";
import useEnlaces from "../hooks/useEnlaces";
import "./HomePage.css";

export const HomePage = () => {
  const { enlaces, loading, error, addEnlace, removeEnlace, setRefres } =
    useEnlaces();
  const { user } = useContext(AuthContext);

  return (
    <section className="homepage">
      {loading ? (
        <p>Cargando enlace ......</p>
      ) : (
        <>
          {error && <ErrorMessage message={error} />}
          {user && <NewEnlace addEnlace={addEnlace} />}

          <ul>
            <h1 className="title"> Nuevos Enlaces</h1>
            <li className="enlaces">
              <ListEnlaces
                enlaces={enlaces}
                removeEnlace={removeEnlace}
                setRefres={setRefres}
              />
            </li>
          </ul>
        </>
      )}
    </section>
  );
};
