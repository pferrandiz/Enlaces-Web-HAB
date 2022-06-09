import { useEffect, useState } from "react";
import { getAllEnlacesService } from "../comunicaciones";

const useEnlaces = () => {
  const [enlaces, setEnlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadEnlaces = async () => {
      try {
        setEnlaces(true);
        const data = await getAllEnlacesService();
        setEnlaces(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadEnlaces();
  }, []);
  const addEnlace = (data) => {
    setEnlaces([data, ...enlaces]);
  };
  const removeEnlace = (id) => {
    setEnlaces(enlaces.filter((enlace) => enlace.id !== id));
  };

  return { enlaces, loading, error, addEnlace, removeEnlace };
};

export default useEnlaces;
