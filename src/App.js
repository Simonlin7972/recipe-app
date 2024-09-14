import React, { useState, useMemo } from 'react';
import { Autocomplete, TextField, Button, Container, Typography, Box, CircularProgress, Paper, Divider, Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createFilterOptions } from '@mui/material/Autocomplete';
import './App.css';
import recipes from './recipes.json';
import { lightTheme, darkTheme } from './theme';
import CssBaseline from '@mui/material/CssBaseline';
import { IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ShuffleIcon from '@mui/icons-material/Shuffle';

// 假設您在 theme.js 中導出了所有主題
import { allThemes } from './theme';

// 創建一個自定義主題來覆蓋 Autocomplete 的樣式
const theme = createTheme({
  components: {
    MuiAutocomplete: {
      styleOverrides: {
        popper: {
          border: '2px solid red', // 測試用的明顯邊框
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          borderRadius: '4px',
        },
      },
    },
  },
});

const filterOptions = createFilterOptions({
  limit: 5,
});

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [dish, setDish] = useState('');
  const [ingredients, setIngredients] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [randomDish, setRandomDish] = useState(null);
  const [currentTheme, setCurrentTheme] = useState(lightTheme);

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

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    setCurrentTheme(isDarkMode ? lightTheme : darkTheme);
  };

  const randomizeTheme = () => {
    const randomTheme = allThemes[Math.floor(Math.random() * allThemes.length)];
    setCurrentTheme(randomTheme);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && dish.trim() !== '') {
      getIngredients();
    }
  };

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
          <IconButton onClick={toggleTheme} color="inherit">
            {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <IconButton onClick={randomizeTheme} color="inherit">
            <ShuffleIcon />
          </IconButton>
        </Box>
        <Container maxWidth="sm" sx={{ py: 4 }}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
            <Typography variant="h4" component="h1" gutterBottom align="left" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2 }}>
              食譜與食材清單生成器
            </Typography>
            <Typography variant="caption" component="h2" gutterBottom align="left" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 4 }}>
              Made by Simon L
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={9}>
                <Autocomplete
                  fullWidth
                  options={dishOptions}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="輸入菜色名稱"
                      variant="outlined"
                      onKeyPress={handleKeyPress}
                    />
                  )}
                  value={dish}
                  onChange={(event, newValue) => {
                    setDish(newValue || '');
                  }}
                  onInputChange={(event, newInputValue) => {
                    setDish(newInputValue);
                  }}
                  filterOptions={filterOptions}
                  freeSolo
                  limitTags={6}
                  ListboxProps={{
                    style: { maxHeight: 48 * 6 } // 假設每個選項高度為 48px
                  }}
                  slotProps={{
                    popper: {
                      sx: {
                        backgroundColor: '#fff',
                        border: '1px solid #eee ', // 測試用的明顯邊框
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                        borderRadius: '12px',
                        padding: '4px 8px',
                        margin: '8px',
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={getIngredients}
                  disabled={!dish.trim() || loading} // 當 dish 為空或正在加載時禁用按鈕
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
              sx={{ mt: 2, mb: 3, height: '56px' }}
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
                <Grid container spacing={2}>
                  {(randomDish ? randomDish.食材 : ingredients.食材).map((ingredient, index) => (
                    <Grid item xs={12} key={index}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ flexShrink: 0, mr: 2 }}>{ingredient.名稱}</Typography>
                        <Box sx={{ flexGrow: 1, borderBottom: '1px dashed rgba(204, 204, 204, 0.5)' }} />
                        <Typography sx={{ flexShrink: 0, ml: 2 }}>{ingredient.份量}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>調味料：</Typography>
                <Grid container spacing={2}>
                  {(randomDish ? randomDish.調味料 : ingredients.調味料).map((seasoning, index) => (
                    <Grid item xs={12} key={index}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ flexShrink: 0, mr: 2 }}>{seasoning.名稱}</Typography>
                        <Box sx={{ flexGrow: 1, borderBottom: '1px dashed rgba(204, 204, 204, 0.5)' }} />
                        <Typography sx={{ flexShrink: 0, ml: 2 }}>{seasoning.份量}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  預估熱量：<span style={{ color: theme.palette.primary.main }}>
                    {randomDish ? randomDish.預估熱量 : ingredients.預估熱量}
                  </span> 卡路里
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>營養成分：</Typography>
                <Grid container spacing={2}>
                  {Object.entries(randomDish ? randomDish.營養成分 : ingredients.營養成分).map(([nutrient, value], index) => (
                    <Grid item xs={12} key={index}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ flexShrink: 0, mr: 2 }}>{nutrient}</Typography>
                        <Box sx={{ flexGrow: 1, borderBottom: '1px dashed rgba(204, 204, 204, 0.5)' }} />
                        <Typography sx={{ flexShrink: 0, ml: 2 }}>{value}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
