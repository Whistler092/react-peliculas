import { actorPeliculaDTO } from "../actores/actores.mode";
import { cineDTO } from "../cines/cines.model";
import { generoDTO } from "../generos/generos.model";

export interface pelicula {
    id: number;
    titulo: string;
    poster: string;
}

export interface peliculaCreacionDTO {
    titulo: string;
    enCines: boolean;
    trailer: string;
    resumen?: string;
    fechaLanzamiento?: Date;
    poster?: File;
    posterURL?: string;
    generosIds?: number[];
    cinesIds?: number[];
    actores? : actorPeliculaDTO[];
}

export interface landingPageDTO {
    enCartelera?: pelicula[];
    proximosEstrenos?: pelicula[];
}

export interface peliculasPostGetDTO{
    generos: generoDTO[];
    cines: cineDTO[];
}