import React from 'react';
import { Typography, Box } from '@mui/material';

function MyFridge() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4">我的冰箱</Typography>
      <Typography>這裡是冰箱內容</Typography>
    </Box>
  );
}

export default MyFridge;