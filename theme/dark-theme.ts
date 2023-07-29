
import { createTheme } from '@mui/material/styles';
import { grey, red } from '@mui/material/colors';
import roboto from './font-setup';


// Create a theme instance.
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
        secondary: {
            main: '#19857b'
        },
        error: {
            main: red.A400
        },
    },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiAppBar: {
        defaultProps: {
            elevation: 0
        },
        styleOverrides: {
          root: {
              backgroundColor: '#233457'
          }
      }
    },
}
});
export default darkTheme;