import React from 'react';
import { Typography, Box, List, ListItem, ListItemText } from '@mui/material';

function MyFridge({ fridgeItems }) {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4">我的冰箱</Typography>
      {fridgeItems.length === 0 ? (
        <Typography>你的冰箱是空的</Typography>
      ) : (
        <List>
          {fridgeItems.map((item, index) => (
            <ListItem key={index}>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}

export default MyFridge;