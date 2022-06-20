import { useContext, useEffect, useState } from "react";
import { getAllEnlacesService } from "../comunicaciones";
import { AuthContext } from "../context/AuthContext";

const useEnlaces = () => {
  const { token } = useContext(AuthContext);
  const [enlaces, setEnlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [voto, setVoto] = useState("");
  const [refres, setRefres] = useState(true);

  useEffect(() => {
    const loadEnlaces = async () => {
      try {
        const data = await getAllEnlacesService(token);
        setEnlaces(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
        setRefres(false);
      }
    };
    if (refres) {
      loadEnlaces();
    }
  }, [token, refres]);
  const addEnlace = (data) => {
    setEnlaces([data, ...enlaces]);
  };
  const addVoto = (data) => {
    setVoto([data, ...voto]);
  };
  const removeEnlace = (id) => {
    setEnlaces(enlaces.filter((enlace) => enlace.id !== id));
  };

  return {
    enlaces,
    loading,
    error,
    addEnlace,
    removeEnlace,
    addVoto,
    voto,
    setRefres,
  };
};

export default useEnlaces;
