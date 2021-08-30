import './GoogleMapsSearch.css';
import GoogleMapReact from 'google-map-react';

const defaultProps = {
  center: {
    lat: 40.5,
    lng: -3.666667,
  },
  zoom: 6,
};

const AnyReactComponent = ({ text }) => <div className="mark">{text}</div>;
const { REACT_APP_GOOGLE_MAPS_API_KEY } = process.env;

const GoogleMap = ({ markers }) => (
  <div style={{ height: '100%', width: '100%' }}>
    <GoogleMapReact
      bootstrapURLKeys={{ key: 'AIzaSyAGaha6kvv2kfM94x8ScnXt9PIG2KOH2cs' }}
      defaultCenter={defaultProps.center}
      defaultZoom={defaultProps.zoom}
    >
      <AnyReactComponent lat={40.5} lng={-3.666667} text={'Kreyser Avrora'} />
      <AnyReactComponent lat={40.2} lng={-3.666667} text={'Kreyser Avrora'} />
      <AnyReactComponent lat={40.3} lng={-3.666667} text={'Kreyser Avrora'} />
      <AnyReactComponent lat={40.4} lng={-3.666667} text={'Kreyser Avrora'} />
      <AnyReactComponent lat={40.6} lng={-3.666667} text={'Kreyser Avrora'} />
      <div lat={59.955413} lng={30.337844} />
    </GoogleMapReact>
  </div>
);

export default GoogleMap;
