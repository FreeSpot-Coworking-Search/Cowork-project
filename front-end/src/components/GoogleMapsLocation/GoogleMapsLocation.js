import './GoogleMapsLocation.css';
import GoogleMapReact from 'google-map-react';
import locationIcon from '../../assets/icons/bxs-location-plus 1.png';

const { REACT_APP_GOOGLE_MAPS_API_KEY } = process.env;

export default function GoogleMapsLocation({ center }) {
  const centerPosition = {
    mapCenter: {
      lat: Number(center.latitud),
      lng: Number(center.longitud),
    },
    zoom: 11,
  };
  console.log(centerPosition);

  return (
    <div className="map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: '' }}
        defaultCenter={centerPosition.mapCenter}
        defaultZoom={7}
      >
        <div className="mark" lat={center.latitud} lng={center.longitud}>
          <img src={locationIcon} alt="puntero" />
          <p>{center.nombre}</p>
        </div>
      </GoogleMapReact>
    </div>
  );
}
