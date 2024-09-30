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
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyFridge from './components/MyFridge';
import ShoppingList from './components/ShoppingList';
import BottomNav from './components/BottomNav';
import Profile from './components/Profile';
import MainContent from './components/MainContent';
import RecipesPage from './components/RecipesPage'; // 新增這行

function App() {
  const [currentTheme, setCurrentTheme] = useState(allThemes[0]);
  const [currentThemeName, setCurrentThemeName] = useState('淺色主題');
  const isMobile = useMediaQuery(currentTheme.breakpoints.down('sm'));
  const [fridgeItems, setFridgeItems] = useState([]);
  const [shoppingList, setShoppingList] = useState([]);

  // 加載保存的數據
  useEffect(() => {
    const savedThemeIndex = localStorage.getItem('currentThemeIndex');
    const savedFridgeItems = JSON.parse(localStorage.getItem('fridgeItems'));
    const savedShoppingList = JSON.parse(localStorage.getItem('shoppingList'));

    if (savedThemeIndex !== null) {
      setCurrentTheme(allThemes[savedThemeIndex]);
      setCurrentThemeName(['淺色主題', '深色主題', '藍色主題', '綠色主題', '紫色主題', '深海主題', '沙漠日落主題', '森林主題'][savedThemeIndex]);
    }
    if (savedFridgeItems) setFridgeItems(savedFridgeItems);
    if (savedShoppingList) setShoppingList(savedShoppingList);
  }, []);

  // 保存數據到 localStorage
  useEffect(() => {
    localStorage.setItem('currentThemeIndex', allThemes.indexOf(currentTheme));
    localStorage.setItem('fridgeItems', JSON.stringify(fridgeItems));
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
  }, [currentTheme, fridgeItems, shoppingList]);

  const addToFridge = (item) => {
    setFridgeItems(prev => [...prev, item]);
  };

  const removeFromFridge = (item) => {
    setFridgeItems(prev => prev.filter(i => i !== item));
  };

  const removeFromShopping = (item) => {
    setShoppingList(prev => prev.filter(i => i !== item));
  };

  const addToShoppingList = (item) => {
    setShoppingList(prev => [...prev, item]);
  };

  const randomizeTheme = () => {
    const randomIndex = Math.floor(Math.random() * allThemes.length);
    const randomTheme = allThemes[randomIndex];
    setCurrentTheme(randomTheme);
    const themeNames = ['淺色主題', '深色主題', '藍色主題', '綠色主題', '紫色主題', '深海主題', '沙漠日落主題', '森林主題'];
    setCurrentThemeName(themeNames[randomIndex]);
  };

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Router>
        <div style={{ paddingBottom: isMobile ? '56px' : '0' }}>
          <Routes>
            <Route path="/" element={<MainContent currentTheme={currentTheme} />} />
            <Route path="/fridge" element={
              <MyFridge 
                fridgeItems={fridgeItems} 
                removeFromFridge={removeFromFridge}
              />
            } />
            <Route path="/recipes" element={<RecipesPage />} /> {/* 新增這行 */}
            <Route path="/shopping" element={
              <ShoppingList 
                shoppingList={shoppingList} 
                addToFridge={addToFridge} 
                removeFromShopping={removeFromShopping}
                addToShoppingList={addToShoppingList}
              />
            } />
            <Route path="/profile" element={
              <Profile 
                currentThemeName={currentThemeName}
                randomizeTheme={randomizeTheme}
              />
            } />
          </Routes>
        </div>
        {isMobile && <BottomNav />}
      </Router>
    </ThemeProvider>
  );
}

export default App;
