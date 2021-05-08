import axios, { AxiosResponse } from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { urlGeneros } from "../utils/endpoints";
import { generoDTO } from "./generos.model";

export default function IndiceGeneros() {

  useEffect(() => {
    axios.get(urlGeneros)
    .then((respuesta: AxiosResponse<generoDTO>) => {
      console.log('data', respuesta.data);
    })
  }, []);

  return (
    <>
      <h3>Indice Generos</h3>
      <Link to="generos/crear">Crear Géneros</Link>
    </>
  );
}
