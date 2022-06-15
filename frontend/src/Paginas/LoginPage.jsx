import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUserService } from "../comunicaciones";
import { AuthContext } from "../context/AuthContext";
import "./LoginPage.css";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      const token = await loginUserService({ email, password });
      login(token);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <section className="form-login">
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleForm}>
        <fieldset class="controls1">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Escribe tu Email"
          />
        </fieldset>
        <fieldset class="controls1">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Escribe tu Contraseña"
          />
        </fieldset>

        <button>Iniciar Sesión</button>
        {error ? <p>{error}</p> : null}
        <p>
          Si no tienes cuenta puedes <Link to="/register">registrarte</Link>
        </p>
      </form>
    </section>
  );
};
