import React from 'react';
import { Paper, BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import KitchenIcon from '@mui/icons-material/Kitchen';
import MenuBookIcon from '@mui/icons-material/MenuBook'; // 新增食譜圖標
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';

const BottomNav = () => {
  const location = useLocation();

  return (
    <Paper sx={{ position: 'fixed', bottom: 12, left: 12, right: 12 }} elevation={10}>
      <BottomNavigation value={location.pathname} showLabels>
        <BottomNavigationAction 
          label="首頁" 
          icon={<HomeIcon />} 
          component={Link} 
          to="/" 
          value="/"
        />
        <BottomNavigationAction 
          label="我的冰箱" 
          icon={<KitchenIcon />} 
          component={Link} 
          to="/fridge" 
          value="/fridge"
        />
        <BottomNavigationAction 
          label="食譜" 
          icon={<MenuBookIcon />} 
          component={Link} 
          to="/recipes" 
          value="/recipes"
        />
        <BottomNavigationAction 
          label="採買清單" 
          icon={<ShoppingCartIcon />} 
          component={Link} 
          to="/shopping" 
          value="/shopping"
        />
        <BottomNavigationAction 
          label="個人" 
          icon={<PersonIcon />} 
          component={Link} 
          to="/profile" 
          value="/profile"
        />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNav;