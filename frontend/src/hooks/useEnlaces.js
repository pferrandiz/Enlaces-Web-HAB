import { useContext, useEffect, useState } from "react";
import { getAllEnlacesService } from "../comunicaciones";
import { AuthContext } from "../context/AuthContext";

const useEnlaces = () => {
  const { token } = useContext(AuthContext);
  const [enlaces, setEnlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadEnlaces = async () => {
      try {
        setEnlaces(true);
        const data = await getAllEnlacesService(token);
        setEnlaces(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadEnlaces();
  }, [token]);
  const addEnlace = (data) => {
    setEnlaces([data, ...enlaces]);
  };
  const removeEnlace = (id) => {
    setEnlaces(enlaces.filter((enlace) => enlace.id !== id));
  };

  return { enlaces, loading, error, addEnlace, removeEnlace };
};

export default useEnlaces;
