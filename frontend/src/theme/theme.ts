import { createTheme } from '@mui/material/styles';

export const colors = {
  primary: '#09b267',
  primaryHover: '#00cd79',
  background: '#f2f2f2',
  divider: '#cccccc',
  white: '#ffffff',
};

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
    },
    background: {
      default: colors.background,
    },
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderRight: `1px solid ${colors.divider}`,
          '&:last-child': {
            borderRight: 'none',
          },
        },
      },
    },
  },
});

export default theme;