import React, { useState } from 'react';
import { Typography, Box, List, ListItem, ListItemText, ListItemButton, Checkbox, TextField, Button, Grid, Container, Paper } from '@mui/material';

function ShoppingList({ shoppingList, addToFridge, removeFromShopping, addToShoppingList }) {
  const [newItem, setNewItem] = useState('');

  const handleItemClick = (item) => {
    addToFridge(item);
    removeFromShopping(item);
  };

  const handleAddItem = () => {
    if (newItem.trim() !== '') {
      addToShoppingList(newItem.trim());
      setNewItem('');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom align="left" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2 }}>
          採買清單
        </Typography>
        
        <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <Grid item xs>
            <TextField
              fullWidth
              variant="outlined"
              label="新增食材"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleAddItem();
                }
              }}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={handleAddItem}>
              新增
            </Button>
          </Grid>
        </Grid>

        <Box sx={{ mt: 2 }}>
          {shoppingList.length === 0 ? (
            <Typography>你的採買清單是空的</Typography>
          ) : (
            <List>
              {shoppingList.map((item, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton onClick={() => handleItemClick(item)}>
                    <Checkbox
                      edge="start"
                      checked={false}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': `checkbox-list-label-${index}` }}
                    />
                    <ListItemText 
                      id={`checkbox-list-label-${index}`}
                      primary={item} 
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Paper>
    </Container>
  );
}

export default ShoppingList;