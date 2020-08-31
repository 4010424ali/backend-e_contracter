import React from 'react';
import GoogleMapReact from 'google-map-react';
import LocationPin from './LocationPin';

const Map = ({ data }) => {
  const { formattedAddress, coordinates } = data.customer.location;
  const location = {
    address: formattedAddress,
    lat: coordinates[1],
    lng: coordinates[0],
  };
  return (
    <>
      <div style={{ width: '100%', height: '200px' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAnzspCEJURX6ietNKj5oi0nSNfP_L0dtk' }}
          defaultCenter={location}
          defaultZoom={17}
        >
          <LocationPin
            text={formattedAddress}
            lat={location.lat}
            lng={location.lng}
          />
        </GoogleMapReact>
      </div>
    </>
  );
};

export default Map;
