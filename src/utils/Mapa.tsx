import { MapContainer, Marker, Popup, TileLayer, useMapEvent } from "react-leaflet";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadown from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import { coordenadasDTO } from "./coordenadas.mode";
import { useState } from "react";
import "leaflet/dist/leaflet.css";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadown,
  iconAnchor: [16, 37],
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function Mapa(props: mapaProps) {
  const [coordenadas, setCoordendas] = useState<coordenadasDTO[]>(
    props.coordenadas
  );

  function transformarCoordenadas(): coordenadasDTO | undefined {
    if (props.coordenadas && props.coordenadas.length > 0) {
      const respuesta: coordenadasDTO = {
        lat: props.coordenadas[0].lat,
        lng: props.coordenadas[0].lng,
      };
      console.log("transformarCoordenadas", respuesta);

      return respuesta;
    }
    return undefined;
  }
  return (
    <MapContainer
      center={[-76.50024, 3.467087209646245]}
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
            setCoordendas([coordenadas]);
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
  return <Marker position={[props.lat, props.lng]} >
    {props.nombre ? 
      <Popup>
        {props.nombre}
      </Popup>
    : null}
  </Marker>;
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
