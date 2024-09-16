import React from 'react';
import { Paper, BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import KitchenIcon from '@mui/icons-material/Kitchen';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';

const BottomNav = () => {
  const location = useLocation();

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        value={location.pathname}
        showLabels
      >
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