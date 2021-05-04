import { Form, Formik, FormikHelpers } from "formik";
import { peliculaCreacionDTO } from "./peliculas.model";
import * as Yup from "yup";
import React, { useState } from "react";
import FormGroupText from "../utils/FormGroupText";
import FormGroupCheckbox from "../utils/FormGroupCheckbox";
import FormGroupFecha from "../utils/FormGroupFecha";
import FormGroupImagen from "../utils/FormGroupImagen";
import Button from "../utils/Button";
import { Link } from "react-router-dom";
import SelectorMultiple, {
  selectorMultipleModel,
} from "../utils/SelectorMultiple";
import { generoDTO } from "../generos/generos.model";
import { cineDTO } from "../cines/cines.model";
import TypeAheadActores from "../actores/TypeAheadActores";
import { actorPeliculaDTO } from "../actores/actores.mode";

export default function FormularioPeliculas(props: formularioPeliculasProps) {
  const [generosSeleccionados, setGenerosSeleccionados] = useState(
    mapear(props.generosSeleccionados)
  );
  const [generosNoSeleccionados, setGenerosNoSeleccionados] = useState(
    mapear(props.generosNoSeleccionados)
  );

  const [cinesSeleccionados, setCinesSeleccionados] = useState(
    mapear(props.cinesSeleccionados)
  );
  const [cinesNoSeleccionados, setCinesNoSeleccionados] = useState(
    mapear(props.cinesNoSeleccionados)
  );

  const [actoresSeleccionados, setActoresSeleccionados] = useState<
    actorPeliculaDTO[]
  >(props.actoresSeleccionados);

  function mapear(
    arreglo: { id: number; nombre: string }[]
  ): selectorMultipleModel[] {
    return arreglo.map((valor) => {
      return {
        llave: valor.id,
        valor: valor.nombre,
      };
    });
  }
  return (
    <Formik
      initialValues={props.modelo}
      onSubmit={(valores, acciones) => {
        valores.generosIds = generosSeleccionados.map((valor) => valor.llave);
        valores.cinesIds = cinesSeleccionados.map((valor) => valor.llave);
        valores.actores = actoresSeleccionados;

        props.onSubmit(valores, acciones);
      }}
      validationSchema={Yup.object({
        titulo: Yup.string()
          .required("Este campo es requerido")
          .primeraLetraMayuscula(),
      })}
    >
      {(formikProps) => (
        <Form>
          <FormGroupText label="Título" campo="titulo" />
          <FormGroupCheckbox label="En Cines" campo="enCines" />
          <FormGroupText label="Trailer" campo="trailer" />
          <FormGroupFecha label="Fecha Lanzamiento" campo="fechaLanzamiento" />
          <FormGroupImagen
            label="Poster"
            campo="poster"
            imagenURL={props.modelo.posterURL}
          />

          <div className="form-group">
            <label htmlFor="">Géneros:</label>
            <SelectorMultiple
              seleccionados={generosSeleccionados}
              noSeleccionados={generosNoSeleccionados}
              onChange={(seleccionados, noSeleccionados) => {
                setGenerosNoSeleccionados(noSeleccionados);
                setGenerosSeleccionados(seleccionados);
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="">Cines:</label>
            <SelectorMultiple
              seleccionados={cinesSeleccionados}
              noSeleccionados={cinesNoSeleccionados}
              onChange={(seleccionados, noSeleccionados) => {
                setCinesNoSeleccionados(noSeleccionados);
                setCinesSeleccionados(seleccionados);
              }}
            />
          </div>

          <div className="form-group">
            <TypeAheadActores
              actores={actoresSeleccionados}
              onAdd={(actores) => {
                setActoresSeleccionados(actores);
              }}
              onRemove={(actor) => {
                const actores = actoresSeleccionados.filter((x) => x !== actor);
                setActoresSeleccionados(actores);
              }}
              listadoUI={(actor: actorPeliculaDTO) => (
                <>
                  {actor.nombre} /{" "}
                  <input
                    type="text"
                    value={actor.personaje}
                    placeholder="Personaje"
                    onChange={(e) => {
                      const indice = actoresSeleccionados.findIndex(
                        (x) => x.id === actor.id
                      );

                      const actores = [...actoresSeleccionados];
                      actores[indice].personaje = e.currentTarget.value;
                      setActoresSeleccionados(actores);
                    }}
                  />
                </>
              )}
            />
          </div>

          <Button disabled={formikProps.isSubmitting} type="submit">
            Enviar
          </Button>
          <Link className="btn btn-secondary" to="/">
            Cancelar
          </Link>
        </Form>
      )}
    </Formik>
  );
}

interface formularioPeliculasProps {
  modelo: peliculaCreacionDTO;
  onSubmit(
    valores: peliculaCreacionDTO,
    acciones: FormikHelpers<peliculaCreacionDTO>
  ): void;
  generosSeleccionados: generoDTO[];
  generosNoSeleccionados: generoDTO[];
  cinesSeleccionados: cineDTO[];
  cinesNoSeleccionados: cineDTO[];
  actoresSeleccionados: actorPeliculaDTO[];
}
