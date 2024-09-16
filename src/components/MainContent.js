import React, { useState, useMemo, useTransition } from 'react';
import { Container, Typography, Box, CircularProgress, Paper, Divider, Grid, Skeleton, List, ListItem, ListItemText, Fade } from '@mui/material';
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
            } else {
              const relatedDishes = results.map(result => result.dish).filter((value, index, self) => self.indexOf(value) === index);
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
    startTransition(() => {
      setSelectedDish(recipes[dishName]);
      setIngredients(recipes[dishName]);
    });
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      getIngredients();
    }
  };

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
        {/* ... 其餘的 JSX 保持不變 ... */}
      </Paper>
    </Container>
  );
}

export default MainContent;