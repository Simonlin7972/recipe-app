import React, { useState, useMemo } from 'react';
import { Autocomplete, TextField, Button, Container, Typography, Box, List, ListItem, ListItemText, CircularProgress, Paper, Divider, Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createFilterOptions } from '@mui/material/Autocomplete';
import './App.css';
import recipes from './recipes.json';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4caf50',
    },
    secondary: {
      main: '#ff9800',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Noto Sans TC", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

// 自定義過濾選項，最多顯示5個
const filterOptions = createFilterOptions({
  limit: 5,
});

function App() {
  const [dish, setDish] = useState('');
  const [ingredients, setIngredients] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [randomDish, setRandomDish] = useState(null);

  const dishOptions = useMemo(() => Object.keys(recipes), []);

  const getIngredients = () => {
    setLoading(true);
    setError('');
    setIngredients(null);
    setRandomDish(null);

    setTimeout(() => {
      if (dish.trim() === '') {
        setError('請輸入菜色名稱');
      } else if (recipes[dish]) {
        setIngredients(recipes[dish]);
      } else {
        setError('找不到該菜色的食材清單');
      }
      setLoading(false);
    }, 500);
  };

  const getRandomDish = () => {
    setLoading(true);
    setError('');
    setIngredients(null);
    
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * dishOptions.length);
      const randomDishName = dishOptions[randomIndex];
      setDish(randomDishName);
      setRandomDish({
        name: randomDishName,
        ...recipes[randomDishName]
      });
      setLoading(false);
    }, 500);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            食材清單生成器
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={9}>
              <Autocomplete
                fullWidth
                options={dishOptions}
                renderInput={(params) => <TextField {...params} label="輸入菜色名稱" variant="outlined" />}
                value={dish}
                onChange={(event, newValue) => {
                  setDish(newValue || '');
                }}
                onInputChange={(event, newInputValue) => {
                  setDish(newInputValue);
                }}
                filterOptions={filterOptions}
                freeSolo
              />
            </Grid>
            <Grid item xs={3}>
              <Button
                fullWidth
                variant="contained"
                onClick={getIngredients}
                disabled={loading}
                sx={{ height: '56px' }} // 確保按鈕高度與輸入欄位一致
              >
                {loading ? '載入中...' : '搜尋'}
              </Button>
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            onClick={getRandomDish}
            disabled={loading}
            sx={{ mt: 2, mb: 3 }}
          >
            今天午餐吃什麼
          </Button>
          {loading && <CircularProgress sx={{ display: 'block', mx: 'auto', my: 2 }} />}
          {error && (
            <Typography color="error" sx={{ mt: 2, textAlign: 'center' }}>
              {error}
            </Typography>
          )}
          {(ingredients || randomDish) && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                {randomDish ? `今日推薦：${randomDish.name}` : '食材清單：'}
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>主要食材：</Typography>
              <List dense>
                {(randomDish ? randomDish.食材 : ingredients.食材).map((ingredient, index) => (
                  <ListItem key={index}>
                    <ListItemText 
                      primary={`${ingredient.名稱} - ${ingredient.份量}`} 
                    />
                  </ListItem>
                ))}
              </List>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>調味料：</Typography>
              <List dense>
                {(randomDish ? randomDish.調味料 : ingredients.調味料).map((seasoning, index) => (
                  <ListItem key={index}>
                    <ListItemText 
                      primary={`${seasoning.名稱} - ${seasoning.份量}`} 
                    />
                  </ListItem>
                ))}
              </List>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                預估熱量：<span style={{ color: theme.palette.primary.main }}>
                  {randomDish ? randomDish.預估熱量 : ingredients.預估熱量}
                </span> 卡路里
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>營養成分：</Typography>
              <List dense>
                {Object.entries(randomDish ? randomDish.營養成分 : ingredients.營養成分).map(([nutrient, value], index) => (
                  <ListItem key={index}>
                    <ListItemText 
                      primary={`${nutrient}: ${value}`} 
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default App;
