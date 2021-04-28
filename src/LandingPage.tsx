import React, { useEffect, useState } from "react";
import ListadoPeliculas from "./peliculas/ListadoPeliculas";
import { landingPageDTO } from "./peliculas/peliculas.model";

export default function LandingPage() {
  const [peliculas, setPeliculas] = useState<landingPageDTO>({});

  useEffect(() => {
    const timerId = setTimeout(() => {
      setPeliculas({
        enCartelera: [
          {
            id: 1,
            titulo: "Spider-Man: Far FromHome",
            poster:
              "https://m.media-amazon.com/images/M/MV5BMGZlNTY1ZWUtYTMzNC00ZjUyLWE0MjQtMTMxN2E3ODYxMWVmXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_UX182_CR0,0,182,268_AL_.jpg",
          },
          {
            id: 2,
            titulo: "The Matrix Revolutions",
            poster:
              "https://m.media-amazon.com/images/M/MV5BNzNlZTZjMDctZjYwNi00NzljLWIwN2QtZWZmYmJiYzQ0MTk2XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_UX182_CR0,0,182,268_AL_.jpg",
          },
        ],
        proximosEstrenos: [
          {
            id: 1,
            titulo: "The Conjuring: The Devil Made Me Do It (2021)",
            poster:
              "https://m.media-amazon.com/images/M/MV5BYzQxMjVkZjEtMDQxYy00MGIwLWE1NjYtYzZkZmU1NTFlZGFlXkEyXkFqcGdeQXVyNjY1MTg4Mzc@._V1_UY268_CR16,0,182,268_AL_.jpg",
          },
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
