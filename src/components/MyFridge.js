import React from 'react';
import { Typography, Box, List, ListItem, ListItemText, Container, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function MyFridge({ fridgeItems, removeFromFridge }) {
  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom align="left" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2 }}>
          我的冰箱
        </Typography>
        <Box sx={{ mt: 2 }}>
          {fridgeItems.length === 0 ? (
            <Typography>你的冰箱是空的</Typography>
          ) : (
            <List>
              {fridgeItems.map((item, index) => (
                <ListItem
                  key={index}
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={() => removeFromFridge(item)}>
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Paper>
    </Container>
  );
}

export default MyFridge;