import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUserService } from "../comunicaciones";
import { AuthContext } from "../context/AuthContext";

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
    <section>
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleForm}>
        <fieldset>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </fieldset>

        <button>Iniciar Sesión</button>
        {error ? <p>{error}</p> : null}
      </form>
    </section>
  );
};
