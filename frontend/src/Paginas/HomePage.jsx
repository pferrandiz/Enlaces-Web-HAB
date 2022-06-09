import { useContext } from "react";
import { ErrorMessage } from "../components/ErrorMessage";
import { NewEnlace } from "../components/NewEnlace";
import { ListEnlaces } from "../components/ListEnlaces";
import { AuthContext } from "../context/AuthContext";
import useEnlaces from "../hooks/useEnlaces";

export const HomePage = () => {
  const { enlaces, loading, error, addEnlace, removeEnlace } = useEnlaces();
  const { user } = useContext(AuthContext);

  if (loading) return <p>Cargando enlace ......</p>;
  if (error) return <ErrorMessage message={{ error }} />;

  return (
    <section>
      {user ? <NewEnlace addEnlace={addEnlace} /> : null}
      <h1>Nuevos Enlaces</h1>
      <ListEnlaces enlaces={enlaces} removeEnlace={removeEnlace} />
    </section>
  );
};
