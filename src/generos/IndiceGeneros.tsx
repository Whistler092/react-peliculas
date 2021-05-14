import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../utils/Button";
import confirmar from "../utils/Confirmar";
import { urlGeneros } from "../utils/endpoints";
import ListadoGenerico from "../utils/ListadoGenerico";
import Paginacion from "../utils/Paginacion";
import { generoDTO } from "./generos.model";

export default function IndiceGeneros() {
  const [generos, setGeneros] = useState<generoDTO[]>();
  const [totalDePaginas, setTotalDePaginas] = useState(0);
  const [recordsPorPagina, setRecordsPorPagina] = useState(5);

  const [pagina, setPagina] = useState(1);

  useEffect(() => {
    cargarDatos();
  }, [pagina, recordsPorPagina]);

  function cargarDatos() {
    axios
      .get(urlGeneros, {
        params: { pagina, recordsPorPagina },
      })
      .then((respuesta: AxiosResponse<generoDTO[]>) => {
        console.log("data", respuesta.data);
        const totalDeRegistros = parseInt(
          respuesta.headers["cantidadtotalregistros"],
          10
        );
        const totalDePaginas = Math.ceil(totalDeRegistros / recordsPorPagina);
        console.log("totalDePaginas", totalDePaginas);
        setTotalDePaginas(totalDePaginas);
        setGeneros(respuesta.data);
      });
  }

  async function borrar(id: number) {
    try {
      await axios.delete(`${urlGeneros}/${id}`);
      cargarDatos();
    } catch (error) {
      console.log(error.response.data);
    }
  }

  return (
    <>
      <h3>Géneros</h3>
      <Link className="btn btn-primary" to="generos/crear">
        Crear Géneros
      </Link>

      <div className="form-group" style={{ width: "150px" }}>
        <label htmlFor="setRecordsPorPagina">Registros Por Pagina</label>
        <select
          className="form-control"
          defaultValue={10}
          onChange={(e) => {
            setPagina(1);
            setRecordsPorPagina(parseInt(e.currentTarget.value, 10));
          }}
          name="setRecordsPorPagina"
          id="setRecordsPorPagina"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>
      </div>

      <Paginacion
        cantidadTotalDePaginas={totalDePaginas}
        paginaActual={pagina}
        onChange={(nuevaPagina) => setPagina(nuevaPagina)}
      ></Paginacion>

      <ListadoGenerico listado={generos}>
        <table className="table table-striped">
          <thead>
            <tr>
              <th></th>
              <th>Nombre</th>
            </tr>
          </thead>
          <tbody>
            {generos?.map((genero) => (
              <tr key={genero.id}>
                <td>
                  <Link
                    className="btn btn-success"
                    to={`/generos/editar/${genero.id}`}
                  >
                    Editar
                  </Link>
                  <Button
                    className="btn btn-danger"
                    onClick={async () =>
                      confirmar(async () => await borrar(genero.id))
                    }
                  >
                    Borrar
                  </Button>
                </td>
                <td>{genero.nombre}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </ListadoGenerico>
    </>
  );
}
