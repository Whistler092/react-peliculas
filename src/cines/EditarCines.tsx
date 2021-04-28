import React from "react";
import FormularioCines from "./FormularioCines";

export default function CrearCines() {
  return (
    <>
      <h3>Editar Cines</h3>
      <FormularioCines
        modelo={{
          nombre: "Cinepolis",
          latitud: 3.4144382019373305,
          longitud: -76.548143690452,
        }}
        onSubmit={(valores) => console.log(valores)}
      ></FormularioCines>
    </>
  );
}
