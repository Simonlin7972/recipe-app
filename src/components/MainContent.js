import React, { useState, useMemo, useTransition, useEffect } from 'react';
import { Container, Typography, Box, CircularProgress, Paper, Divider, Grid, Skeleton, List, ListItem, ListItemText, Fade, Card, CardContent } from '@mui/material';
import { createFilterOptions } from '@mui/material/Autocomplete';
import CustomButton from './CustomButton';
import CustomInput from './CustomInput';
import recipes from '../recipes.json';

const filterOptions = createFilterOptions({
  limit: 5,
});

function MainContent({ currentTheme }) {
  const [dish, setDish] = useState(null);
  const [ingredients, setIngredients] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedDish, setSelectedDish] = useState(null);
  const [contentLoaded, setContentLoaded] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [lastSearch, setLastSearch] = useState('');

  // 加載上次搜索的內容
  useEffect(() => {
    const savedLastSearch = localStorage.getItem('lastSearch');
    if (savedLastSearch) {
      setLastSearch(savedLastSearch);
      setInputValue(savedLastSearch);
    }
  }, []);

  // 保存最後搜索的內容
  useEffect(() => {
    localStorage.setItem('lastSearch', lastSearch);
  }, [lastSearch]);

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
    setLastSearch(inputValue);

    startTransition(() => {
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
              setSelectedDish(results[0].name);
            } else {
              const relatedDishes = [...new Set(results.map(result => result.dish))];
              setSearchResults(relatedDishes);
            }
          } else {
            setError('找不到相關的菜色、食材或調味料');
          }
        }
        setIsSearching(false);
        setContentLoaded(true);
      }, 1500);
    });
  };

  const handleDishClick = (dishName) => {
    setSelectedDish(dishName);
    setIngredients(recipes[dishName]);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      getIngredients();
    }
  };

  const renderNutritionInfo = (nutrition) => (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>營養成分：</Typography>
      <Grid container spacing={2}>
        {Object.entries(nutrition).map(([key, value]) => (
          <Grid item xs={6} key={key}>
            <Paper elevation={2} sx={{ p: 1, textAlign: 'center' }}>
              <Typography variant="body2">{key}</Typography>
              <Typography variant="h6">{value}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom align="left" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2 }}>
          食譜與食材清單生成器
        </Typography>
        <Typography variant="caption" component="h2" gutterBottom align="left" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 4 }}>
          Made by Simon L
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={9}>
            <CustomInput
              options={allOptions}
              value={dish}
              inputValue={inputValue}
              onChange={(event, newValue) => {
                startTransition(() => {
                  setDish(newValue);
                });
              }}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              filterOptions={filterOptions}
              onKeyPress={handleKeyPress}
              loading={isSearching || isPending}
              disabled={isSearching || isPending}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <CustomButton
              onClick={getIngredients}
              disabled={!inputValue.trim() || isSearching || isPending}
              fullWidth
            >
              {isSearching || isPending ? <CircularProgress size={24} color="inherit" /> : '搜尋'}
            </CustomButton>
          </Grid>
        </Grid>
        
        {isSearching && (
          <Box sx={{ mt: 4 }}>
            <Skeleton variant="text" height={40} />
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
                <Typography variant="h6" gutterBottom>相關菜色：</Typography>
                <List>
                  {searchResults.map((dish, index) => (
                    <ListItem key={index} button onClick={() => handleDishClick(dish)}>
                      <ListItemText primary={dish} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
            {selectedDish && ingredients && (
              <Card sx={{ mt: 4 }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom color="primary">{selectedDish}</Typography>
                  <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    預估熱量: {ingredients.預估熱量} 卡路里
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h6" gutterBottom>食材：</Typography>
                  <Grid container spacing={1}>
                    {ingredients.食材.map((item, index) => (
                      <Grid item xs={6} key={index}>
                        <Paper elevation={1} sx={{ p: 1, textAlign: 'center' }}>
                          <Typography variant="body2">{item.名稱}</Typography>
                          <Typography variant="body1" fontWeight="bold">{item.份量}</Typography>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                  <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>調味料：</Typography>
                  <Grid container spacing={1}>
                    {ingredients.調味料.map((item, index) => (
                      <Grid item xs={6} key={index}>
                        <Paper elevation={1} sx={{ p: 1, textAlign: 'center' }}>
                          <Typography variant="body2">{item.名稱}</Typography>
                          <Typography variant="body1" fontWeight="bold">{item.份量}</Typography>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                  {renderNutritionInfo(ingredients.營養成分)}
                </CardContent>
              </Card>
            )}
          </Box>
        </Fade>
      </Paper>
    </Container>
  );
}

export default MainContent;