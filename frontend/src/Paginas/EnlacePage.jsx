import { useParams } from "react-router-dom";
import useEnlace from "../hooks/useEnlace";
import Enlace from "../components/Enlace";

const EnlacePage = () => {
  const { id } = useParams();
  const { enlace, loading, error } = useEnlace(id);
  if (loading) return <p>Cargando enlace ......</p>;
  if (error) return <p>{error}</p>;

  return (
    <section>
      <h1>Enlace from {enlace.email}</h1>
      <Enlace enlace={enlace} />
    </section>
  );
};

export default EnlacePage;
