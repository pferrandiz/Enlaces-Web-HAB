import { useContext } from "react";
import { ErrorMessage } from "../components/ErrorMessage";
import { NewEnlace } from "../components/NewEnlace";
import { ListEnlaces } from "../components/ListEnlaces";
import { AuthContext } from "../context/AuthContext";
import useEnlaces from "../hooks/useEnlaces";

export const HomePage = () => {
  const { enlaces, loading, error, addEnlace, removeEnlace } = useEnlaces();
  const { user } = useContext(AuthContext);

  return (
    <section>
      {loading ? (
        <p>Cargando enlace ......</p>
      ) : (
        <>
          {error && <ErrorMessage message={error} />}
          {user && <NewEnlace addEnlace={addEnlace} />}

          <h1>Nuevos Enlaces</h1>
          <ListEnlaces enlaces={enlaces} removeEnlace={removeEnlace} />
        </>
      )}
    </section>
  );
};
