import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvent,
} from "react-leaflet";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { coordenadasDTO } from "./coordenadas.model";
import "leaflet/dist/leaflet.css";

import { useState } from "react";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconAnchor: [16, 37],
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function Mapa(props: mapaProps) {
  const [coordenadas, setCoordenadas] = useState<coordenadasDTO[]>(
    props.coordenadas
  );
  return (
    <MapContainer
      center={[18.467455, -69.931242]}
      zoom={14}
      style={{ height: props.height }}
    >
      <TileLayer
        attribution="React Películas"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {props.soloLectura ? null : (
        <ClickMapa
          setPunto={(coordenadas) => {
            setCoordenadas([coordenadas]);
            props.manejarClickMapa(coordenadas);
          }}
        />
      )}

      {coordenadas.map((coordenada) => (
        <Marcador key={coordenada.lat + coordenada.lng} {...coordenada} />
      ))}
    </MapContainer>
  );
}

interface mapaProps {
  height: string;
  coordenadas: coordenadasDTO[];
  manejarClickMapa(coordenadas: coordenadasDTO): void;
  soloLectura: boolean;
}

Mapa.defaultProps = {
  height: "500px",
  soloLectura: false,
  manejarClickMapa: () => {},
};

function ClickMapa(props: clickMapaProps) {
  useMapEvent("click", (e) => {
    props.setPunto({ lat: e.latlng.lat, lng: e.latlng.lng });
  });
  return null;
}

interface clickMapaProps {
  setPunto(coordenadas: coordenadasDTO): void;
}

function Marcador(props: coordenadasDTO) {
  return (
    <Marker position={[props.lat, props.lng]}>
      {props.nombre ? <Popup>{props.nombre}</Popup> : null}
    </Marker>
  );
}
