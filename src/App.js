import React, { useState, useMemo, useEffect } from 'react';
import { Container, Typography, Box, CircularProgress, Paper, Divider, Grid, Skeleton, useMediaQuery, Fade, List, ListItem, ListItemText } from '@mui/material';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import { createFilterOptions } from '@mui/material/Autocomplete';
import './App.css';
import recipes from './recipes.json';
import { allThemes } from './theme';
import CssBaseline from '@mui/material/CssBaseline';
import { IconButton } from '@mui/material';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import CustomButton from './components/CustomButton';
import CustomInput from './components/CustomInput';
import { useTranslation } from 'react-i18next';
import './i18n';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import KitchenIcon from '@mui/icons-material/Kitchen';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MyFridge from './components/MyFridge';
import ShoppingList from './components/ShoppingList';

const filterOptions = createFilterOptions({
  limit: 5,
});

function MainContent() {
  const { t, i18n } = useTranslation();
  const [dish, setDish] = useState(null);
  const [ingredients, setIngredients] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');
  const [currentTheme, setCurrentTheme] = useState(allThemes[0]);
  const [searchResults, setSearchResults] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedDish, setSelectedDish] = useState(null);
  const [currentThemeName, setCurrentThemeName] = useState('淺色主題');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [contentLoaded, setContentLoaded] = useState(false);

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

  const getIngredients = () => {
    setIsSearching(true);
    setContentLoaded(false);
    setError('');
    setIngredients(null);
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
            const relatedDishes = results.map(result => result.dish).filter((value, index, self) => self.indexOf(value) === index);
            setSearchResults(relatedDishes);
          }
        } else {
          setError('找不到相關的菜色、食材或調味料');
        }
      }
      setIsSearching(false);
      setTimeout(() => setContentLoaded(true), 0);
    }, 1500);
  };

  const handleDishClick = (dishName) => {
    setSelectedDish(recipes[dishName]);
    setIngredients(recipes[dishName]);
  };

  const randomizeTheme = () => {
    const randomIndex = Math.floor(Math.random() * allThemes.length);
    const randomTheme = allThemes[randomIndex];
    setCurrentTheme(randomTheme);
    const themeNames = ['淺色主題', '色主題', '藍色主題', '綠色主題', '紫色主題', '深海主題', '沙漠日落主題', '森林主題'];
    setCurrentThemeName(themeNames[randomIndex]);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      getIngredients();
    }
  };

  useEffect(() => {
    if (isSearching) {
      setContentLoaded(false);
    }
  }, [isSearching]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
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
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', p: 2 }}>
          <Typography variant="body2" sx={{ mr: 2 }}>
            {currentThemeName}
          </Typography>
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
            <Grid container spacing={2} direction={isMobile ? 'column' : 'row'}>
              <Grid item xs={12} sm={9}>
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
                  loading={isSearching}
                  disabled={isSearching}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <CustomButton
                  onClick={getIngredients}
                  disabled={!inputValue.trim() || isSearching}
                  fullWidth
                >
                  {isSearching ? <CircularProgress size={24} color="inherit" /> : '搜尋'}
                </CustomButton>
              </Grid>
            </Grid>
            {isSearching && (
              <Box sx={{ mt: 4 }}>
                <Skeleton variant="text" height={40} />
                <Skeleton variant="rectangular" height={100} sx={{ mt: 2 }} />
                <Skeleton variant="text" height={40} sx={{ mt: 2 }} />
                <Skeleton variant="rectangular" height={100} sx={{ mt: 2 }} />
              </Box>
            )}

            <Fade in={contentLoaded} timeout={500}>
              <Box>
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
                        <ListItem 
                          key={index} 
                          button 
                          onClick={() => handleDishClick(dish)}
                          sx={{
                            '&:hover': {
                              cursor: 'pointer',
                              backgroundColor: 'rgba(0, 0, 0, 0.04)', // 可選：添加背景色變化
                            },
                          }}
                        >
                          <ListItemText 
                            primary={`${index + 1}. ${dish}`}
                            secondary="點擊查看食譜"
                          />
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
                      預估熱量：<span style={{ color: currentTheme.palette.primary.main }}>
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
              </Box>
            </Fade>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const currentTheme = isDarkMode ? allThemes[1] : allThemes[0];
  const isMobile = useMediaQuery(currentTheme.breakpoints.down('sm'));
  const [value, setValue] = useState(0);

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Router>
        <div style={{ paddingBottom: isMobile ? '56px' : '0' }}>
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/fridge" element={<MyFridge />} />
            <Route path="/shopping" element={<ShoppingList />} />
          </Routes>
        </div>
        {isMobile && (
          <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              showLabels
            >
              <BottomNavigationAction label="首頁" icon={<HomeIcon />} component={Link} to="/" />
              <BottomNavigationAction label="我的冰箱" icon={<KitchenIcon />} component={Link} to="/fridge" />
              <BottomNavigationAction label="採買清單" icon={<ShoppingCartIcon />} component={Link} to="/shopping" />
            </BottomNavigation>
          </Paper>
        )}
      </Router>
    </ThemeProvider>
  );
}

export default App;
