import { peliculaDTO } from "./peliculas.model";
import css from './PeliculaIndividual.module.css';
import { Link } from "react-router-dom";
import Button from "../utils/Button";

export default function PeliculaIndividual(props: peliculaIndividualProps){

    const construirLink = () => `/pelicula/${props.pelicula.id}`;

    return ( 
        <div className={css.div}>
            <a href={construirLink()}>
                <img src={props.pelicula.poster} alt="Poster" ></img>
            </a>
            <p>
                <a href={construirLink()}>{props.pelicula.titulo}</a>
            </p>
            <div>
                <Link style={{marginRight: '1rem'}} className="btn btn-info" to={`/peliculas/editar/${props.pelicula.id}`}>
                    Editar
                </Link>
                <Button className="btn btn-danger" >Borrar</Button>
            </div>
        </div>
    )
}

interface peliculaIndividualProps{
    pelicula: peliculaDTO;
}