import { createTheme } from '@mui/material/styles';

// 共享的主題設置
const sharedTheme = {
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: '"Noto Sans TC", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          boxShadow: 'none',
          height: '56px',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', // 柔和的陰影 
          border: '1px solid rgba(0, 0, 0, 0.05)', // 淡淡的邊框
          borderRadius: 12,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          borderRadius: 12,
          border: '1px solid',
          borderColor: '#e0e0e0',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          borderBottom: '1px solid',
          borderColor: 'divider',
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
          },
        },
        popper: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          borderRadius: 12,
          border: '1px solid #eee',
          backgroundColor: '#fff',
          padding: '4px 8px',
          margin: '8px',
        },
        listbox: {
          maxHeight: 48 * 8, // 假設每個選項高度為 48px
        },
      },
    },
  },
};

//白色主題
export const lightTheme = createTheme({
  ...sharedTheme,
  palette: {
    mode: 'light',
    primary: { main: '#3f51b5' },
    secondary: { main: '#f50057' },
    background: {
      default: '#ffffff',
      paper: '#fafafa',
    },
    text: {
      primary: '#333333',
      secondary: '#757575',
    },
  },
});

//黑色主題
export const darkTheme = createTheme({
  ...sharedTheme,
  palette: {
    mode: 'dark',
    primary: { main: '#90caf9' },
    secondary: { main: '#f48fb1' },
    background: {
      default: '#303030',
      paper: '#424242',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0bec5',
    },
  },
});

//藍色主題
export const blueTheme = createTheme({
  ...sharedTheme,
  palette: {
    mode: 'light',
    primary: { main: '#2196f3' },
    secondary: { main: '#ff4081' },
    background: {
      default: '#e3f2fd',
      paper: '#ffffff',
    },
    text: {
      primary: '#0d47a1',
      secondary: '#1565c0',
    },
  },
});

//綠色主題
export const greenTheme = createTheme({
  ...sharedTheme,
  palette: {
    mode: 'light',
    primary: { main: '#4caf50' },
    secondary: { main: '#ff9800' },
    background: {
      default: '#e8f5e9',
      paper: '#ffffff',
    },
    text: {
      primary: '#1b5e20',
      secondary: '#33691e',
    },
  },
});

//紫色主題
export const purpleTheme = createTheme({
  ...sharedTheme,
  palette: {
    mode: 'light',
    primary: { main: '#9c27b0' },
    secondary: { main: '#00bcd4' },
    background: {
      default: '#f3e5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#4aI148c',
      secondary: '#6a1b9a',
    },
  },
});

// 深海主題
export const deepOceanTheme = createTheme({
  ...sharedTheme,
  palette: {
    mode: 'dark',
    primary: { main: '#00bcd4' },  // 青色
    secondary: { main: '#ff9800' },  // 橙色
    background: {
      default: '#001f3f',  // 深藍色
      paper: '#002b56',    // 稍淺的藍色
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0bec5',
    },
  },
});

// 沙漠日落主題
export const desertSunsetTheme = createTheme({
  ...sharedTheme,
  palette: {
    mode: 'light',
    primary: { main: '#ff5722' },  // 深橙色
    secondary: { main: '#ffc107' },  // 琥珀色
    background: {
      default: '#fff8e1',  // 淺黃色
      paper: '#ffffff',
    },
    text: {
      primary: '#3e2723',  // 深棕色
      secondary: '#5d4037',  // 棕色
    },
  },
});

// 森林主題
export const forestTheme = createTheme({
  ...sharedTheme,
  palette: {
    mode: 'light',
    primary: { main: '#2e7d32' },  // 深綠色
    secondary: { main: '#ffd54f' },  // 黃色
    background: {
      default: '#e8f5e9',  // 淺綠色
      paper: '#ffffff',
    },
    text: {
      primary: '#1b5e20',  // 深綠色
      secondary: '#33691e',  // 綠色
    },
  },
});

// 將所有主題導出為一個數組
export const allThemes = [
  lightTheme, 
  darkTheme, 
  blueTheme, 
  greenTheme, 
  purpleTheme, 
  deepOceanTheme, 
  desertSunsetTheme, 
  forestTheme
];
