import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const Logo = styled('img')({
  height: 40,
  marginRight: 16,
  borderRadius: "50px",
});

const Header = () => {
  return (
    <AppBar  color="primary">
      <Toolbar>
        <Box display="flex" alignItems="center" flexGrow={1}>
          <Logo src="src\assets\hahnSoftware.jpeg" alt="Logo" />
          <Typography variant="h6" color='white' component="div">
            HahnSoftware
          </Typography>
        </Box>
        <Typography variant="subtitle1" color="white" component="div">
          Bouchta Elyahyaoui
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;