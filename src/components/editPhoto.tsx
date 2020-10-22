import React from 'react';
import {
  Label,
  Box,
  DropZone,
  BasePropertyProps,
  DropZoneProps,
} from 'admin-bro';

const Edit: React.FC<BasePropertyProps> = (props) => {
  const { property, onChange } = props;

  const handleDropZoneChange: DropZoneProps['onChange'] = (files) => {
    onChange(property.label, files[0]);
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <Box>
        <Label>{property.label}</Label>
        <DropZone onChange={handleDropZoneChange} />
      </Box>
    </div>
  );
};

export default Edit;
