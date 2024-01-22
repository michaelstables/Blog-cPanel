import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        // Define other palette properties for light mode if needed
    },
    // You can also define typography, spacing, etc.
});

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        // Define other palette properties for dark mode if needed
    },
    // You can also define typography, spacing, etc.
});
