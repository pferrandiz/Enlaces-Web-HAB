import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUserService } from "../comunicaciones";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [error, setError] = useState("");

  const handleForm = async (e) => {
    e.preventDefault();
    setError("");
    if (password1 !== password2) {
      setError("Las contraseñas debe ser iguales");
      return;
    }
    try {
      await registerUserService({ email, password: password1 });
      navigate("/login");
    } catch (error) {
      setError(error.mesage);
    }
  };

  return (
    <section>
      <h1>Registro</h1>
      <form onSubmit={handleForm}>
        <fieldset>
          <label htmlFor="name">Nombre</label>
          <input
            type="name"
            id="name"
            name="name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="surname">Apellido</label>
          <input
            type="surname"
            id="surname"
            name="surname"
            value={surname}
            required
            onChange={(e) => setSurname(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="password1">Contraseña</label>
          <input
            type="password"
            id="password1"
            name="password1"
            value={password1}
            required
            onChange={(e) => setPassword1(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="password2">Repite Contraseña</label>
          <input
            type="password"
            id="passswor2"
            name="password2"
            value={password2}
            required
            onChange={(e) => setPassword2(e.target.value)}
          />
        </fieldset>
        <button>Registrar</button>
        {error ? <p>{error}</p> : null}
      </form>
    </section>
  );
};
