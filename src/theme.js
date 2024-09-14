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
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
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
          borderColor: 'divider',
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
  },
};

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
      primary: '#4a148c',
      secondary: '#6a1b9a',
    },
  },
});

// 將所有主題導出為一個數組
export const allThemes = [lightTheme, darkTheme, blueTheme, greenTheme, purpleTheme];
