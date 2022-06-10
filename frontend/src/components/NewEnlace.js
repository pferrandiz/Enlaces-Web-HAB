import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { sendEnlaceService } from "../comunicaciones";

export const NewEnlace = ({ addEnlace }) => {
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [image, setImage] = useState();
  const { token } = useContext(AuthContext);

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      setSending(true);

      const data = new FormData(e.target);
      const enlace = await sendEnlaceService({ data, token });

      addEnlace(enlace);
      e.target.reset();
      setImage(null);
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
        <label htmlFor="text">Texto</label>
        <input type="text" id="text" name="text" />
      </fieldset>
      <fieldset>
        <label htmlFor="image">Imagen</label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        {image ? (
          <figure>
            <img
              src={URL.createObjectURL(image)}
              style={{ width: "200px" }}
              alt="Preview"
            />
          </figure>
        ) : null}
      </fieldset>
      <button>Publicar Enlace</button>
      {sending ? <p>Enviando Enlace....</p> : null};
      {error ? <p>{error}</p> : null}
    </form>
  );
};
