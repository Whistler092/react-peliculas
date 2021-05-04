import { cineDTO } from "../cines/cines.model";
import { generoDTO } from "../generos/generos.model";
import FormularioPeliculas from "./FormularioPeliculas";

export default function CrearPeliculas() {
  const generos: generoDTO[] = [
    { id: 1, nombre: "Acción" },
    { id: 2, nombre: "Drama" },
    { id: 3, nombre: "Terror" },
  ];

  const cines: cineDTO[] = [
    { id: 1, nombre: "Cinespolis Limonar" },
    { id: 2, nombre: "Cineplex Unicentro" },
  ];

  return (
    <>
      <h3>Crear Películas</h3>
      <FormularioPeliculas
        actoresSeleccionados={[]}
        cinesNoSeleccionados={cines}
        cinesSeleccionados={[]}
        generosSeleccionados={[]}
        generosNoSeleccionados={generos}
        modelo={{ titulo: "", enCines: false, trailer: "" }}
        onSubmit={(valores) => console.log(valores)}
      />
    </>
  );
}
