import { useParams } from "react-router-dom";
import useUser from "../hooks/useUser";
import { ErrorMessage } from "../components/ErrorMessage";
import { UserEnlaces } from "../components/UserEnlaces";

export const UserPage = () => {
  const { id } = useParams();
  const { user, loading, error } = useUser(id);

  if (loading) return;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section>
      <h1>Usuario {user.email}</h1>
      <section className="user-data">
        <p>User id: {user.id}</p>
        <p>
          Registrado desde : {new Date(user.created_at).toLocaleDateString()}{" "}
        </p>
        <UserEnlaces id={user.id} />
      </section>
    </section>
  );
};
