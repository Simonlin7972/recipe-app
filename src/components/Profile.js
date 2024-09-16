import React from 'react';
import { Typography, Box, Button, Container, Paper } from '@mui/material';
import ShuffleIcon from '@mui/icons-material/Shuffle';

function Profile({ currentThemeName, randomizeTheme }) {
  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom align="left" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2 }}>
          個人頁面
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1" gutterBottom>
            當前主題：{currentThemeName}
          </Typography>
          <Button
            variant="contained"
            startIcon={<ShuffleIcon />}
            onClick={randomizeTheme}
            sx={{ mt: 2 }}
          >
            隨機更換主題
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Profile;