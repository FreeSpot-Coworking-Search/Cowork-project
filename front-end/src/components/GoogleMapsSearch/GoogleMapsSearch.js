/* eslint-disable jsx-a11y/alt-text */
import './GoogleMapsSearch.css';
import GoogleMapReact from 'google-map-react';
import '../../css/presentation.css';
import SearchPointer from './SearchPointer';

const defaultProps = {
  center: {
    lat: 40.5,
    lng: -3.666667,
  },
  zoom: 5,
};

const { REACT_APP_GOOGLE_MAPS_API_KEY } = process.env;

export default function GoogleMapSearch({ markers, searchObject }) {
  return (
    <div className="googleMapsSearch presentation">
      <GoogleMapReact
        bootstrapURLKeys={{ key: REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        {markers.map((center) => {
          return (
            <SearchPointer
              lat={Number(center.latitud)}
              lng={Number(center.longitud)}
              text={center.nombre}
              id={center.id}
              searchObject={searchObject}
            />
          );
        })}
      </GoogleMapReact>
    </div>
  );
}
