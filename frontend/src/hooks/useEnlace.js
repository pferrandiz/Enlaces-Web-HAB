import { useEffect, useState } from "react";
import { getSingleEnlaceService } from "../comunicaciones";

const useEnlace = (id) => {
  const [enlace, setEnlace] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadEnlaces = async () => {
      try {
        setLoading(true);
        const data = await getSingleEnlaceService(id);
        setEnlace(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadEnlaces();
  }, [id]);
  return { enlace, error, loading };
};

export default useEnlace;
