import React from 'react';
import { Room } from '@material-ui/icons';

const LocationPin = ({ text }) => {
  return (
    <div className="pin">
      <Room color="error" />
      <p className="pin-text">{text}</p>
    </div>
  );
};

export default LocationPin;
