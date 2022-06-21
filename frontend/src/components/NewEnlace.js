import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { sendEnlaceService } from "../comunicaciones";
import "./NewEnlace.css";

export const NewEnlace = ({ addEnlace }) => {
  const [sending, setSending] = useState(false);
  const { token } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState();

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      setSending(true);

      const data = new FormData(e.target);
      const enlace = await sendEnlaceService({
        data,
        token,
        title,
        url,
        text,
        image,
      });

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
    <section className="form-newenlace">
      <h1 className="h1new">Publica nuevo Enlace</h1>
      <form onSubmit={handleForm}>
        <li className="controls2">
          <label htmlFor="title">Título</label>
          <input
            type="text"
            id="title"
            name="title"
            required
            onChange={(e) => setTitle(e.target.files)}
          />

          <label htmlFor="url">Nuevo Enlace</label>
          <input
            type="url"
            id="url"
            name="url"
            required
            onChange={(e) => setUrl(e.target.files)}
          />

          <label htmlFor="text">Texto</label>
          <input
            type="text"
            id="text"
            name="text"
            onChange={(e) => setText(e.target.files)}
          />

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
                style={{ width: "100px" }}
                alt="Preview"
              />
            </figure>
          ) : null}

          <button>Publicar Enlace </button>
          {sending ? <p>Enviando Enlace....</p> : null}
          {error ? <p>{error}</p> : null}
        </li>
      </form>
    </section>
  );
};
