import React from "react";
import { actorPeliculaDTO } from "../actores/actores.mode";
import { cineDTO } from "../cines/cines.model";
import { generoDTO } from "../generos/generos.model";
import FormularioPeliculas from "./FormularioPeliculas";

export default function EditarPeliculas() {
  const generosSeleccionados: generoDTO[] = [{ id: 1, nombre: "Acción" }];

  const generosNoSeleccionados: generoDTO[] = [
    { id: 2, nombre: "Drama" },
    { id: 3, nombre: "Terror" },
  ];

  const cinesSeleccionados: cineDTO[] = [
    { id: 1, nombre: "Cinespolis Limonar" },
  ];

  const cinesNoSeleccionados: cineDTO[] = [
    { id: 2, nombre: "Cineplex Unicentro" },
  ];

  const actoresSeleccionados: actorPeliculaDTO[] = [
    {
      id: 1,
      nombre: "Sir Philip Anthony Hopkins",
      personaje: "",
      foto:
        "https://m.media-amazon.com/images/M/MV5BMTg5ODk1NTc5Ml5BMl5BanBnXkFtZTYwMjAwOTI4._V1_UY317_CR6,0,214,317_AL_.jpg",
    },
  ];

  return (
    <>
      <h3>Editar Películas</h3>
      <FormularioPeliculas
        actoresSeleccionados={actoresSeleccionados}
        cinesSeleccionados={cinesSeleccionados}
        cinesNoSeleccionados={cinesNoSeleccionados}
        generosNoSeleccionados={generosNoSeleccionados}
        generosSeleccionados={generosSeleccionados}
        modelo={{
          titulo: "Spider-Man",
          enCines: true,
          trailer: "url",
          posterURL:
            "https://m.media-amazon.com/images/M/MV5BOTIzYmUyMmEtMWQzNC00YzExLTk3MzYtZTUzYjMyMmRiYzIwXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_UY268_CR1,0,182,268_AL_.jpg",
          fechaLanzamiento: new Date("2019-01-01T00:00:00"),
        }}
        onSubmit={(valores) => console.log(valores)}
      />{" "}
    </>
  );
}
