import React from 'react';
import { Typography, Box } from '@mui/material';

function ShoppingList() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4">採買清單</Typography>
      <Typography>這裡是採買清單內容</Typography>
    </Box>
  );
}

export default ShoppingList;