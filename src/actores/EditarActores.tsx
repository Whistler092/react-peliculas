import React from "react";
import FormularioActores from "./FormularioActores";

export default function EditarActores() {
  return (
    <>
      <h3>Editar Actores</h3>
      <FormularioActores
        modelo={{
          nombre: "Anthony Hopkins (I)",
          fechaNacimiento: new Date("1937-12-31T00:00:00"),
          fotoURL: 'https://m.media-amazon.com/images/M/MV5BMTg5ODk1NTc5Ml5BMl5BanBnXkFtZTYwMjAwOTI4._V1_UY317_CR6,0,214,317_AL_.jpg',
          biografia: `
          ## Anthony Hopkins (I)

Anthony Hopkins was born on December 31, 1937, in **Margam, Wales**, 
`
        }}
        onSubmit={(valores) => console.log(valores)}
      ></FormularioActores>
    </>
  );
}
