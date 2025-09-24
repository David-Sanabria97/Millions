import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#060606', 
    },
    secondary: {
      main: '#f5f5f5', // ← También puedes personalizar el secundario
    },
  },
});

export default theme;