import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { sendEnlaceService } from "../comunicaciones";

export const NewEnlace = () => {
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const { token } = useContext(AuthContext);

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      setSending(true);

      const data = new FormData(e.target);
      const enlace = await sendEnlaceService({ data, token });

      console.log(enlace);
    } catch (error) {
      setError(error.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={handleForm}>
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
        <label htmlFor="image">Imagen</label>
        <input type="file" id="image" name="image" />
      </fieldset>
      <button>Publicar Enlace</button>
      {sending ? <p>Enviando Enlace....</p> : null};
      {error ? <p>{error}</p> : null}
    </form>
  );
};
