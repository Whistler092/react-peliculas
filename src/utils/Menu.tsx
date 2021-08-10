import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import AutenticacionContext from "../Auth/AutenticacionContext";
import Autorizado from "../Auth/Autorizado";
import { logout } from "../Auth/manejadorJWT";
import Button from "./Button";

export default function Menu() {
  const claseActiva = "active";
  const { actualizar, claims } = useContext(AutenticacionContext);

  function obtenerNombreUsuario() : string{
    if(!claims || claims.length === 0) return "";
    return claims.filter(c => c.nombre === "email")[0].valor;
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/" activeClassName={claseActiva}>
          React Peliculas
        </NavLink>
        <div
          className="collapse navbar-collapse"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/peliculas/filtrar"
                activeClassName={claseActiva}
              >
                Filtrar Películas
              </NavLink>
            </li>

            <Autorizado
              role="admin"
              autorizado={
                <>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="/generos"
                      activeClassName={claseActiva}
                    >
                      Géneros
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="/actores"
                      activeClassName={claseActiva}
                    >
                      Actores
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="/cines"
                      activeClassName={claseActiva}
                    >
                      Cines
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="/peliculas/crear"
                      activeClassName={claseActiva}
                    >
                      Crear Películas
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="/usuarios"
                      activeClassName={claseActiva}
                    >
                      Usuarios
                    </NavLink>
                  </li>
                </>
              }
            />
          </ul>

          <div className="d-flex">
            <Autorizado
              autorizado={
                <>
                  <span className="nav-link">Hola, {obtenerNombreUsuario()}</span>
                  <Button
                    onClick={() => {
                      logout();
                      actualizar([]);
                    }}
                    className="nav-link btn btn-link"
                  >
                    Log out
                  </Button>
                </>
              }
              noAutorizado={
                <>
                  <Link to="/registro" className="nav-link btn btn-link">
                    Registro
                  </Link>
                  <Link to="/login" className="nav-link btn btn-link">
                    Login
                  </Link>
                </>
              }
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
