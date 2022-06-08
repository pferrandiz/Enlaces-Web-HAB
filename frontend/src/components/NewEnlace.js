import { useState } from "react/cjs/react.production.min";

export const NewEnlace = () => {
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  return (
    <form>
      <h1>Publica nuevo Enlace</h1>
      <fieldset>
        <label htmlFor="title">Título</label>
        <input type="text" id="title" name="title" required />
      </fieldset>
      <fieldset>
        <label htmlFor="url">Nuevo Enlace</label>
        <input type="url" id="url" name="url" required />
      </fieldset>
      <fieldset>
        <label htmlFor="text">Título</label>
        <input type="text" id="text" name="text" />
      </fieldset>
      <fieldset>
        <label htmlFor="image">Título</label>
        <input type="file" id="image" name="image" />
      </fieldset>
      <button>Publicar Enlace</button>
      {sending ? <p>Enviando Enlace....</p> : null};
      {error ? <p>{error}</p> : null}
    </form>
  );
};
