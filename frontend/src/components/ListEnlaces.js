import useEnlaces from "../hooks/useEnlaces";
import Enlaces from "./Enlace";

export const ListEnlaces = ({ enlace }) => {
  return Enlaces.length ? (
    <ul>
      {enlace.map((enlace) => (
        <li key={enlace.id}>
          <enlace enlace={enlace} />
        </li>
      ))}
    </ul>
  ) : (
    <p>Todavia no hay enlaces....</p>
  );
};
