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
      sx={{
        height: '56px',
        borderRadius: '12px',
        textTransform: 'none',
        ...sx
      }}
    >
      {children}
    </Button>
  );
};

export default CustomButton;