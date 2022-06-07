import { useEffect, useState } from "react";
import getAllEnlacesService from "../comunicaciones";

const useEnlaces = () => {
  const [enlace, setEnlaces] = useState([]);
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

  return { enlace, loading, error };
};

export default useEnlaces;
