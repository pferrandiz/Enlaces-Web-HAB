import { ListEnlaces } from "../components/ListEnlaces";
import useEnlaces from "../hooks/useEnlaces";

export const HomePage = () => {
  const { enlaces, loading, error } = useEnlaces();
  if (loading) return <p>Cargando enlace ......</p>;
  if (error) return <p>{error}</p>;

  return (
    <section>
      <h1>Nuevos Enlaces</h1>
      <ListEnlaces enlaces={enlaces} />
    </section>
  );
};
