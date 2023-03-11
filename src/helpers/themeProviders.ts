import { createTheme } from '@mui/material';

const customMUITheme = createTheme({
  palette: {
    secondary: {
      main: '#1F2729',
    },
    warning: {
      main: '#EBA417',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          ':disabled': {
            backgroundColor: '#A8A8B3',
          },
        },
      },
    },
  },
});

export default customMUITheme;
