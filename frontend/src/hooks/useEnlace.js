import { useContext, useEffect, useState } from "react";
import { getSingleEnlaceService } from "../comunicaciones";
import { AuthContext } from "../context/AuthContext";

const useEnlace = (id) => {
  const { token } = useContext(AuthContext);
  const [enlace, setEnlace] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadEnlace = async () => {
      try {
        setLoading(true);
        const data = await getSingleEnlaceService(id, token);
        setEnlace(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadEnlace();
  }, [id]);
  return { enlace, error, loading };
};

export default useEnlace;
