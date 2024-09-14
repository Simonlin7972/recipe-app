import React from 'react';
import { Button } from '@mui/material';

const CustomButton = ({ variant = 'contained', color = 'primary', onClick, disabled, fullWidth, sx, children }) => {
  return (
    <Button
      variant={variant}
      color={color}
      onClick={onClick}
      disabled={disabled}
      fullWidth={fullWidth}
      sx={sx}
    >
      {children}
    </Button>
  );
};

export default CustomButton;