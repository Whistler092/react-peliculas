import axios from "axios";
import { useContext, useState } from "react";
import { useHistory } from "react-router";
import { urlCuentas } from "../utils/endpoints";
import MostrarErrores from "../utils/MostrarErrores";
import AutenticacionContext from "./AutenticacionContext";
import { credencialesUsuario, respuestaAutenticacion } from "./auth.model";
import FormularioAuth from "./FormularioAuth";
import { guardarTokenLocalStorage, obtenerClaims } from "./manejadorJWT";

export default function Login() {
  const [errores, setErrores] = useState<string[]>([]);
  const {actualizar} = useContext(AutenticacionContext);
  const history = useHistory();


  async function login(credenciales: credencialesUsuario) {
    try {
      const respuesta = await axios.post<respuestaAutenticacion>(
        `${urlCuentas}/login`,
        credenciales
      );
      console.log(respuesta);
      guardarTokenLocalStorage(respuesta.data);
      actualizar(obtenerClaims());
      history.push("/");
    } catch (error) {
        console.log(error);
        if(typeof(error.response.data) === "string"){
            setErrores([error.response.data]);
        }
    }
  }

  return (
    <>
      <h3>Login</h3>
      <MostrarErrores errores={errores} />
      <FormularioAuth
        modelo={{ email: "", password: "" }}
        onSubmit={async (valores) => await login(valores)}
      />
    </>
  );
}
