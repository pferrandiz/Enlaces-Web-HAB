import { Enlace } from "./Enlace";

export const ListEnlaces = ({ enlaces, removeEnlace }) => {
  return enlaces.length ? (
    <ul className="listenlace">
      {enlaces.map((enlace) => {
        return (
          <li key={enlace.id}>
            <Enlace enlace={enlace} removeEnlace={removeEnlace} />
          </li>
        );
      })}
    </ul>
  ) : (
    <p>Todavia no hay enlaces....</p>
  );
};
