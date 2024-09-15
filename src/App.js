import React, { useState, useMemo } from 'react';
import { Container, Typography, Box, CircularProgress, Paper, Divider, Grid, Skeleton, List, ListItem, ListItemText, Link } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { createFilterOptions } from '@mui/material/Autocomplete';
import './App.css';
import recipes from './recipes.json';
import { lightTheme, darkTheme, allThemes } from './theme';
import CssBaseline from '@mui/material/CssBaseline';
import { IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import CustomButton from './components/CustomButton';
import CustomInput from './components/CustomInput';

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
  const [dish, setDish] = useState(null);  // 將初始值設為 null
  const [ingredients, setIngredients] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');
  const [randomDish, setRandomDish] = useState(null);
  const [currentTheme, setCurrentTheme] = useState(lightTheme);
  const [searchResults, setSearchResults] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedDish, setSelectedDish] = useState(null);

  const allOptions = useMemo(() => {
    const options = [];
    Object.entries(recipes).forEach(([dishName, recipe]) => {
      options.push({ type: 'dish', name: dishName });
      recipe.食材.forEach(ingredient => {
        options.push({ type: 'ingredient', name: ingredient.名稱, dish: dishName });
      });
      recipe.調味料.forEach(seasoning => {
        options.push({ type: 'seasoning', name: seasoning.名稱, dish: dishName });
      });
    });
    return options;
  }, []);

  const dishOptions = useMemo(() => {
    return allOptions.filter(option => option.type === 'dish').map(option => option.name);
  }, [allOptions]);

  const getIngredients = () => {
    setIsSearching(true);
    setError('');
    setIngredients(null);
    setRandomDish(null);
    setSearchResults([]);
    setSelectedDish(null);

    setTimeout(() => {
      if (inputValue.trim() === '') {
        setError('請輸入菜色名稱、食材或調味料');
      } else {
        const results = allOptions.filter(option => 
          option.name.toLowerCase().includes(inputValue.toLowerCase())
        );
        if (results.length > 0) {
          if (results[0].type === 'dish') {
            setIngredients(recipes[results[0].name]);
          } else {
            // 如果搜索的是食材或調味料
            const relatedDishes = results.map(result => result.dish).filter((value, index, self) => self.indexOf(value) === index);
            setSearchResults(relatedDishes);
          }
        } else {
          setError('找不到相關的菜色、食材或調味料');
        }
      }
      setIsSearching(false);
    }, 1500);
  };

  const handleDishClick = (dishName) => {
    setSelectedDish(recipes[dishName]);
    setIngredients(recipes[dishName]);
  };

  const getRandomDish = () => {
    setIsSearching(true);
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
      setIsSearching(false);
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
    if (event.key === 'Enter' && inputValue.trim() !== '') {
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
                <CustomInput
                  options={allOptions}
                  value={dish}
                  inputValue={inputValue}
                  onChange={(event, newValue) => {
                    setDish(newValue);
                  }}
                  onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                  }}
                  filterOptions={filterOptions}
                  onKeyPress={handleKeyPress}
                  disabled={isSearching}
                  onSearchClick={getIngredients}
                />
              </Grid>
              <Grid item xs={3}>
                <CustomButton
                  onClick={getIngredients}
                  disabled={!inputValue.trim() || isSearching}
                  fullWidth
                >
                  {isSearching ? '載入中...' : '搜尋'}
                </CustomButton>
              </Grid>
            </Grid>
            <CustomButton
              color="secondary"
              startIcon={<ShuffleIcon />}
              onClick={getRandomDish}
              disabled={isSearching}
              fullWidth
              sx={{ mt: 2, mb: 3 }}
            >
              今天午餐吃什麼
            </CustomButton>
            {isSearching && (
              <Box sx={{ mt: 4 }}>
                <Skeleton variant="text" height={40} />
                <Skeleton variant="rectangular" height={100} sx={{ mt: 2 }} />
                <Skeleton variant="text" height={40} sx={{ mt: 2 }} />
                <Skeleton variant="rectangular" height={100} sx={{ mt: 2 }} />
              </Box>
            )}
            {error && (
              <Typography color="error" sx={{ mt: 2, textAlign: 'center' }}>
                {error}
              </Typography>
            )}
            {searchResults.length > 0 && !selectedDish && (
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                  以下是可以用「{inputValue}」來製作的料理：
                </Typography>
                <List>
                  {searchResults.map((dish, index) => (
                    <ListItem key={index}>
                      <Link
                        component="button"
                        variant="body1"
                        onClick={() => handleDishClick(dish)}
                        sx={{ textAlign: 'left' }}
                      >
                        {`${index + 1}. ${dish}`}
                      </Link>
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
            {(ingredients || selectedDish) && (
              <Box sx={{ mt: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                  {selectedDish ? selectedDish.name : '食材清單：'}
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>主要食材：</Typography>
                <Grid container spacing={2}>
                  {(selectedDish ? selectedDish.食材 : ingredients.食材).map((ingredient, index) => (
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
                  {(selectedDish ? selectedDish.調味料 : ingredients.調味料).map((seasoning, index) => (
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
                    {selectedDish ? selectedDish.預估熱量 : ingredients.預估熱量}
                  </span> 卡路里
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>營養成分：</Typography>
                <Grid container spacing={2}>
                  {Object.entries(selectedDish ? selectedDish.營養成分 : ingredients.營養成分).map(([nutrient, value], index) => (
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
