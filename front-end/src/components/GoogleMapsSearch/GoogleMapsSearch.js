import './GoogleMapsSearch.css';
import GoogleMapReact from 'google-map-react';
import '../../css/presentation.css';
import locationIcon from '../../assets/icons/pngkey.com-dot-icon-png-2444382.png';

const defaultProps = {
  center: {
    lat: 40.5,
    lng: -3.666667,
  },
  zoom: 5,
};

const AnyReactComponent = ({ text }) => (
  <div className="mark">
    <img src={locationIcon} className="mark" />
    {text}
  </div>
);
const { REACT_APP_GOOGLE_MAPS_API_KEY } = process.env;

export default function GoogleMapSearch({ markers }) {
  return (
    <div className="googleMapsSearch presentation">
      <GoogleMapReact
        bootstrapURLKeys={{ key: REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        {markers.map((center) => {
          return (
            <AnyReactComponent
              lat={Number(center.latitud)}
              lng={Number(center.longitud)}
              text={center.nombre}
            />
          );
        })}
      </GoogleMapReact>
    </div>
  );
}
