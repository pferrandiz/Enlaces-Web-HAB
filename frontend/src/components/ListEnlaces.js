import Enlaces from "./Enlace";

export const ListEnlaces = ({ enlaces, removeEnlace }) => {
  return Enlaces.length ? (
    <ul>
      {enlaces.map((enlace) => (
        <li key={enlace.id}>
          <enlace enlace={enlace} removeEnlace={removeEnlace} />
        </li>
      ))}
    </ul>
  ) : (
    <p>Todavia no hay enlaces....</p>
  );
};
