import { MapContainer, Marker, TileLayer, useMapEvent } from "react-leaflet";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadown from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import { coordenadasDTO } from "./coordenadas.mode";
import { useState } from "react";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadown,
  iconAnchor: [16, 37],
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function Mapa(props: mapaProps) {
  const [coordenadas, setCoordendas] = useState<coordenadasDTO[]>(props.coordenadas);

  function transformarCoordenadas(): coordenadasDTO | undefined{
    if(props.coordenadas && props.coordenadas.length > 0){
      const respuesta: coordenadasDTO = {
        lat: props.coordenadas[0].lat,
        lng: props.coordenadas[0].lng
      }
      return respuesta
    }
    return undefined
  }
  return (
    <MapContainer
      center={transformarCoordenadas()}
      zoom={14}
      style={{ height: props.height }}
    >
      <TileLayer
        attribution="React Películas"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ClickMapa
        setPunto={(coordenadas) => {
          setCoordendas([coordenadas]);
          props.manejarClickMapa(coordenadas);
        }}
      />
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
  return <Marker position={[props.lat, props.lng]} />;
}

interface mapaProps {
  height: string;
  coordenadas: coordenadasDTO[];
  manejarClickMapa(coordenadas: coordenadasDTO): void;
}

Mapa.defaultProps = {
  height: "500px",
};
