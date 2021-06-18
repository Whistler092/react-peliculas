import React, { useEffect, useState } from "react";
import ListadoPeliculas from "./peliculas/ListadoPeliculas";
import { landingPageDTO } from "./peliculas/peliculas.model";

export default function LandingPage() {
  const [peliculas, setPeliculas] = useState<landingPageDTO>({});

  useEffect(() => {
    const timerId = setTimeout(() => {
      setPeliculas({
        enCartelera: [
           
        ],
        proximosEstrenos: [
           
        ],
      });
    }, 1000);

    return () => clearTimeout(timerId);
  });
  return (
    <>
      {/* <Button>Mi Componente Boton</Button> */}
      <h3>En Cartelera</h3>
      <ListadoPeliculas peliculas={peliculas.enCartelera}></ListadoPeliculas>

      <h3>Proximos Extrenos</h3>
      <ListadoPeliculas
        peliculas={peliculas.proximosEstrenos}
      ></ListadoPeliculas>
    </>
  );
}
