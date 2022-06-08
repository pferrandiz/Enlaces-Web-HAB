import Enlaces from "./Enlace";

export const ListEnlaces = ({ enlaces }) => {
  return Enlaces.length ? (
    <ul>
      {enlaces.map((enlace) => (
        <li key={enlace.id}>
          <enlace enlace={enlace} />
        </li>
      ))}
    </ul>
  ) : (
    <p>Todavia no hay enlaces....</p>
  );
};
