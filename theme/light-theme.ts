import { createTheme } from '@mui/material/styles';
import { red, grey } from '@mui/material/colors';
import roboto from './font-setup';
import { isWhiteSpaceLike } from 'typescript';

// Create a theme instance.
const lightTheme = createTheme({
    palette: {
        mode: 'light',
        background: {
            default: grey[300]
        },
        primary: {
            main: '#4a148c'
        },
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
    //editar de forma global estilos de componentes Mui
    components: {
        MuiAppBar: {
            defaultProps: {
                elevation: 0
            },
            styleOverrides: {
                root: {
                    backgroundColor: '#2f2357'
                }
            }
        },
    }
});
export default lightTheme;