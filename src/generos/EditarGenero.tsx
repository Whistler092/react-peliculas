import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import Cargando from "../utils/Cargando";
import { urlGeneros } from "../utils/endpoints";
import MostrarErrores from "../utils/MostrarErrores";
import FormularioGeneros from "./FormularioGeneros";
import { generoCreacionDTO, generoDTO } from "./generos.model";

export default function EditarGenero() {
  const { id }: any = useParams();
  const [genero, setGenero] = useState<generoDTO>();
  const [errores, setErrores] = useState<string[]>([]);
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`${urlGeneros}/${id}`)
      .then((respuesta: AxiosResponse<generoDTO>) => {
        setGenero(respuesta.data);
      });
  });

  async function editar(generoEditar: generoCreacionDTO) {
    try {
      await axios.put(`${urlGeneros}/${id}`, generoEditar);
      history.push('/generos');
    } catch (error) {
      setErrores(error.response.data);
    }
  }

  return (
    <>
      <h3>Editar Género </h3>
      <MostrarErrores errores={errores} />
      {genero ? (
        <FormularioGeneros
          modelo={genero}
          onSubmit={async (valores) => {
            await editar(valores);
            console.log(valores);
          }}
        />
      ) : (
        <Cargando />
      )}
    </>
  );
}
