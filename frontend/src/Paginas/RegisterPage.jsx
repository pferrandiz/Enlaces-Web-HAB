import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUserService } from "../comunicaciones";
import "./RegisterPage.css";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");

  const handleForm = async (e) => {
    e.preventDefault();
    setError("");
    if (password1 !== password2) {
      setError("pnmatch");
      return;
    }
    try {
      await registerUserService({ name, surname, email, password: password1 });
      navigate("/login");
    } catch (error) {
      setError(error.mesage);
    }
  };

  return (
    <section className="form-register">
      <h1 className="h1">Registro</h1>
      <form onSubmit={handleForm}>
        <li className="lista">
          <label htmlFor="name">Nombre</label>
          <input
            type="name"
            id="name"
            name="name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            placeholder="Escribe tu Nombre"
          />

          <label htmlFor="surname">Apellidos</label>
          <input
            type="surname"
            id="surname"
            name="surname"
            value={surname}
            required
            onChange={(e) => setSurname(e.target.value)}
            placeholder="Escribe tus Apellidos"
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Escribe tu Email"
          />

          <label htmlFor="password1">Contraseña</label>
          <input
            type="password"
            id="password1"
            name="password1"
            value={password1}
            required
            onChange={(e) => setPassword1(e.target.value)}
            placeholder="Escribe tu Contraseña"
          />

          <label htmlFor="password2">Repite Contraseña</label>
          <input
            type="password"
            id="passswor2"
            name="password2"
            value={password2}
            required
            onChange={(e) => setPassword2(e.target.value)}
            placeholder="Repite tu Contraseña"
          />
          <button>Registrarse</button>
          {error === "pnmatch" ? "Las contraseñas debe ser iguales" : null}
        </li>
      </form>
    </section>
  );
};
