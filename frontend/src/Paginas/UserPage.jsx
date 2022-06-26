import { useParams } from "react-router-dom";
import useUser from "../hooks/useUser";
import { ErrorMessage } from "../components/ErrorMessage";
import { UserEnlaces } from "../components/UserEnlaces";
import useEnlaces from "../hooks/useEnlaces";
import "./UserPage.css";

export const UserPage = () => {
  const { id } = useParams();
  const { user, loading, error } = useUser(id);
  const { setRefres } = useEnlaces();

  if (loading) return;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section className="pageuser">
      <div className="user-info">
        <h1>
          Usuario: {user.name} {user.surname}
        </h1>
        <h2>Email: {user.email}</h2>
      </div>
      <section>
        <UserEnlaces id={user.id} setRefres={setRefres} />
      </section>
    </section>
  );
};
