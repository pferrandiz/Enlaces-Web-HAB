import useEnlaces from "../hooks/useEnlaces";

import { ErrorMessage } from "./ErrorMessage";
import { ListEnlaces } from "./ListEnlaces";
import "./Enlace.css";
import { useEffect, useState } from "react";
import { getUserEnlacesService } from "../comunicaciones";

export const UserEnlaces = ({ id }) => {
  const { removeEnlace, setRefres } = useEnlaces(id);
  const [enlaces, setEnlaces] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    getUserEnlacesService(id)
      .then((response) => {
        setEnlaces(response);
      })
      .catch((err) => {
        setError(err);
        setRefres(setRefres);
      });
  }, [id]);

  if (error) return <ErrorMessage message={error} />;

  return (
    enlaces && (
      <ListEnlaces
        enlaces={enlaces}
        removeEnlace={removeEnlace}
        setRefres={setRefres}
      />
    )
  );
};
