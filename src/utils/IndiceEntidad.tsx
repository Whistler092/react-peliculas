import axios, { AxiosResponse } from "axios";
import React, { ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import confirmar from "./Confirmar";
import ListadoGenerico from "./ListadoGenerico";
import Paginacion from "./Paginacion";

export default function IndiceEntidad<T>(props: indiceEntidadProps<T>) {
  const [entidades, setEntidades] = useState<T[]>();
  const [totalDePaginas, setTotalDePaginas] = useState(0);
  const [recordsPorPagina, setRecordsPorPagina] = useState(5);

  const [pagina, setPagina] = useState(1);

  useEffect(() => {
    cargarDatos();
  }, [pagina, recordsPorPagina]);

  function cargarDatos() {
    axios
      .get(props.url, {
        params: { pagina, recordsPorPagina },
      })
      .then((respuesta: AxiosResponse<T[]>) => {
        const totalDeRegistros = parseInt(
          respuesta.headers["cantidadtotalregistros"],
          10
        );
        const totalDePaginas = Math.ceil(totalDeRegistros / recordsPorPagina);
        console.log("totalDePaginas", totalDePaginas);
        setTotalDePaginas(totalDePaginas);
        setEntidades(respuesta.data);
      });
  }

  async function borrar(id: number) {
    try {
      await axios.delete(`${props.url}/${id}`);
      cargarDatos();
    } catch (error) {
      console.log(error.response.data);
    }
  }

  const botones = (urlEditar: string, id: number) => (
    <>
      <Link className="btn btn-success" to={urlEditar}>
        Editar
      </Link>
      <Button
        className="btn btn-danger"
        onClick={async () => confirmar(async () => await borrar(id))}
      >
        Borrar
      </Button>
    </>
  );

  return (
    <>
      <h3>{props.titulo}</h3>
      <Link className="btn btn-primary" to={props.urlCrear}>
        Crear {props.nombreEntidad}
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

      <ListadoGenerico listado={entidades}>
        <table className="table table-striped">
          {props.children(entidades!, botones)}
        </table>
      </ListadoGenerico>
    </>
  );
}

interface indiceEntidadProps<T> {
  url: string;
  urlCrear: string;
  children(
    entidades: T[],
    botones: (urlEditar: string, id: number) => ReactElement
  ): ReactElement;
  titulo: string;
  nombreEntidad: string;
}
