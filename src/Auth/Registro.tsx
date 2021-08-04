import axios from "axios";
import { useContext, useState } from "react";
import { urlCuentas } from "../utils/endpoints";
import { credencialesUsuario, respuestaAutenticacion } from "./auth.model";
import FormularioAuth from "./FormularioAuth";
import MostrarErrores from "../utils/MostrarErrores";
import { guardarTokenLocalStorage, obtenerClaims } from "./manejadorJWT";
import AutenticacionContext from "./AutenticacionContext";
import { useHistory } from "react-router";

export default function Registro() {
  const [errores, setErrores] = useState<string[]>([]);
  const {actualizar} = useContext(AutenticacionContext);
  const history = useHistory();

  async function registrar(credenciales: credencialesUsuario) {
    try {
      const respuesta = await axios.post<respuestaAutenticacion>(
        `${urlCuentas}/crear`,
        credenciales
      );
      console.log(respuesta);
      guardarTokenLocalStorage(respuesta.data);
      actualizar(obtenerClaims());
      history.push("/");
    } catch (error) {
      console.log(error);
      if(error.response.data && error.response.data.length > 0) {
          if(typeof(error.response.data[0]) === "string") {
              setErrores(error.response.data);
          }else {
                setErrores(error.response.data.map((err: { description: any; }) => err.description));
          }
      }
    }
  }

  return (
    <>
      <h3>Registro</h3>
      <MostrarErrores errores={errores} />
      <FormularioAuth
        modelo={{ email: "", password: "" }}
        onSubmit={async (valores) => await registrar(valores)}
      ></FormularioAuth>
    </>
  );
}
