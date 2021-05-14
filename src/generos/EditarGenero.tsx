import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import Cargando from "../utils/Cargando";
import EditarEntidad from "../utils/EditarEntidad";
import { urlGeneros } from "../utils/endpoints";
import MostrarErrores from "../utils/MostrarErrores";
import FormularioGeneros from "./FormularioGeneros";
import { generoCreacionDTO, generoDTO } from "./generos.model";

export default function EditarGenero() {
  return (
    <>
      <EditarEntidad<generoCreacionDTO, generoDTO>
        url={urlGeneros}
        urlIndice="/generos"
        nombreEntidad="Géneros"
      >
        {(entidad, editar) => (
          <FormularioGeneros
            modelo={entidad}
            onSubmit={async (valores) => {
              await editar(valores);
              console.log(valores);
            }}
          />
        )}
      </EditarEntidad>
    </>
  );
}
