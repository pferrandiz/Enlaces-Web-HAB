import { Link } from "react-router-dom";

const Enlace = ({ enlace }) => {
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
        By {enlace.email} on{""}
        <Link to={`/enlace/${enlace.id}`}>
          {new Date(enlace.created_at).toLocaleString()}
        </Link>
      </p>
    </article>
  );
};

export default Enlace;
