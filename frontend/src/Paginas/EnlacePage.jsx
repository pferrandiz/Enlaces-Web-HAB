import { useParams } from "react-router-dom";
import useEnlace from "../hooks/useEnlace";
import Enlace from "../components/Enlace";
import { ErrorMessage } from "../components/ErrorMessage";

export const EnlacePage = () => {
  const { id } = useParams();
  const { enlace, loading, error } = useEnlace(id);
  if (loading) return <p>Cargando enlace ......</p>;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section>
      <h1>Enlace escrito por {enlace.email}</h1>
      <Enlace enlace={enlace} />
    </section>
  );
};
