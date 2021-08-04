import "./App.css";
import Menu from "./utils/Menu";
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import rutas from "./route-config";
import configurarValidaciones from "./validaciones";
import AutenticacionContext from "./Auth/AutenticacionContext";
import { claim } from "./Auth/auth.model";
import { useEffect, useState } from "react";
import { obtenerClaims } from "./Auth/manejadorJWT";

configurarValidaciones();

function App() {
  const [claims, setClaims] = useState<claim[]>([]);

  useEffect(() => {
    setClaims(obtenerClaims());
  }, []);

  function actualizar(claims: claim[]) {
    setClaims(claims);
  }

  function esAdmin() {
    return (
      claims.findIndex(
        (claim) => claim.nombre === "role" && claim.valor === "admin"
      ) > -1
    );
  }

  return (
    <>
      <BrowserRouter>
        <AutenticacionContext.Provider value={{ claims, actualizar }}>
          <Menu />

          <div className="container">
            <Switch>
              {rutas.map((ruta) => (
                <Route key={ruta.path} path={ruta.path} exact={ruta.exact}>
                  {ruta.esAdmin && !esAdmin() ? (
                    <>
                      <h1>Acceso denegado</h1>
                    </>
                  ) : (
                    <ruta.componente />
                  )}
                </Route>
              ))}
            </Switch>
          </div>
        </AutenticacionContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
