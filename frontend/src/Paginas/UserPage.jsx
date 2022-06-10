import { useParams } from "react-router-dom";
import useUser from "../hooks/useUser";
import { ErrorMessage } from "../components/ErrorMessage";

export const UserPage = () => {
  const { id } = useParams();
  const { user, loading, error } = useUser(id);

  if (loading) return;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section>
      <h1>User {user.name.surname}</h1>
      <section class="user-data">
        <p>User id: {user.email}</p>
      </section>
      id={user.id}
    </section>
  );
};
