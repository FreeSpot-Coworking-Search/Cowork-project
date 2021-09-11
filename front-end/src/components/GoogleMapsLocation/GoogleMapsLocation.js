import './GoogleMapsLocation.css';
import GoogleMapReact from 'google-map-react';
import locationIcon from '../../assets/icons/bxs-location-plus 1.png';
import LocationPointer from './LocationPointer';

const { REACT_APP_GOOGLE_MAPS_API_KEY } = process.env;

export default function GoogleMapsLocation({ center }) {
  const defaultProps = {
    center: {
      lat: Number(center.latitud),
      lng: Number(center.longitud),
    },
    zoom: 11,
  };

  return (
    <div className="map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <LocationPointer
          lat={Number(center.latitud)}
          lng={Number(center.longitud)}
        />
      </GoogleMapReact>
    </div>
  );
}
