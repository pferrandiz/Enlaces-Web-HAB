import { Link } from "react-router-dom";
export const NotFoundPage = () => {
  return (
    <section>
      <h1>Not Found</h1>
      <Link to={"/"}>Volver a la pagina principal</Link>
    </section>
  );
};
