import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import ListadoPeliculas from "./peliculas/ListadoPeliculas";
import { landingPageDTO } from "./peliculas/peliculas.model";
import AlertaContext from "./utils/AlertaContext";
import { urlPeliculas } from "./utils/endpoints";

export default function LandingPage() {
  const [peliculas, setPeliculas] = useState<landingPageDTO>({});

  useEffect(() => {
    cargarDatos();
  }, []);

  function cargarDatos() {
    axios.get(urlPeliculas).then((respuesta: AxiosResponse<landingPageDTO>) => {
      setPeliculas(respuesta.data);
    });
  }

  return (
    <>
      <AlertaContext.Provider value={() => cargarDatos()}>
        <h3>En Cartelera</h3>
        <ListadoPeliculas peliculas={peliculas.enCines}></ListadoPeliculas>

        <h3>Proximos Extrenos</h3>
        <ListadoPeliculas
          peliculas={peliculas.proximosEstrenos}
        ></ListadoPeliculas>
      </AlertaContext.Provider>
    </>
  );
}
