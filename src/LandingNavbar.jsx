import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { blue } from '@mui/material/colors';
import { styled } from '@mui/material/styles';


const LandingNavbar = ()=>{
  

    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
  
  
    const RegisterButton = styled(Button)(({ theme }) => ({
      color: theme.palette.getContrastText(blue[800]),
      backgroundColor: blue[800],
      '&:hover': {
        backgroundColor: blue[900],
      },
    }));
  
    return (
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* logo gelecek*/}
            {/*sayfa ismi kısmı */}
            <Avatar
            alt="Remy Sharp"
            src="/img/logo.jpg"
            sx={{ width: 56, height: 56 }}
            />
            <Box sx={{ flexGrow: 0.03, display: { xs: 'none', md: 'flex' } }}></Box>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: '"Segoe UI Emoji"',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              UNREACT
            </Typography>
  
            
  
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
              
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              
            </Box>
            
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
             
            </Box>
            <Link href="./Register.jsx">
              <RegisterButton
                sx={{ fontFamily: '"Segoe UI Emoji"',mr: 2, color: 'white', display: 'block' }}
          
                variant="contained">
                KAYIT OL
                </RegisterButton>
            </Link>
           
          </Toolbar>
        </Container>
        
      </AppBar>
    
    );
  }



export default LandingNavbar;
