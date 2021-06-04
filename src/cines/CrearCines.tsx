import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router";
import { urlCines } from "../utils/endpoints";
import MostrarErrores from "../utils/MostrarErrores";
import { cineCreacionDTO } from "./cines.model";
import FormularioCines from "./FormularioCines";

export default function CrearCines() {
  const history = useHistory();
  const [errores, setErrores] = useState<string[]>([]);

  async function crear(cine: cineCreacionDTO) {
    try {
      await axios.post(urlCines, cine);
      history.push("/cines");
    } catch (error) {
      setErrores(error.response.data);
    }
  }

  return (
    <>
      <h3>Crear Cines</h3>
      <MostrarErrores errores={errores} />
      <FormularioCines
        modelo={{ nombre: "", latitud: 3.4366372, longitud: -76.5452571 }}
        onSubmit={async (valores) => await crear(valores)}
      ></FormularioCines>
    </>
  );
}
