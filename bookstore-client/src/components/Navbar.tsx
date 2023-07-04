import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.25),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function Navbar({onDataChange}:any) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleDataChange = (e:any) => {
    onDataChange(e.target.value);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1,  }}>
      <AppBar position="static" style={{backgroundColor:'white', color:'#121212'}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            <svg width="70" height="70" viewBox="0 0 164 140" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.387634" y="0.947174" width="163.27" height="138.937" rx="44.1271" fill="#F47266"/>
            <path d="M67.37 21.0565C57.0976 16.1782 42.7396 13.7885 23.5169 13.7037C21.704 13.6792 19.9267 14.205 18.4219 15.211C17.1868 16.0414 16.1758 17.161 15.4777 18.4712C14.7797 19.7814 14.416 21.2422 14.4187 22.725V103.634C14.4187 109.104 18.3309 113.23 23.5169 113.23C43.7233 113.23 63.9923 115.107 76.1327 126.521C76.2987 126.678 76.5075 126.783 76.733 126.823C76.9585 126.863 77.1908 126.836 77.401 126.745C77.6112 126.655 77.7901 126.505 77.9154 126.314C78.0407 126.124 78.1069 125.901 78.1058 125.673V30.338C78.1063 29.6948 77.968 29.059 77.7002 28.4735C77.4324 27.8881 77.0413 27.3666 76.5535 26.9444C73.7726 24.5797 70.6836 22.5992 67.37 21.0565ZM146.888 15.2025C145.382 14.199 143.605 13.6762 141.793 13.7037C122.57 13.7885 108.212 16.1669 97.9398 21.0565C94.6265 22.5964 91.5366 24.573 88.7535 26.9331C88.2668 27.356 87.8766 27.8777 87.6094 28.463C87.3421 29.0484 87.2039 29.6838 87.204 30.3267V125.667C87.2039 125.886 87.2687 126.1 87.3904 126.282C87.5121 126.465 87.6853 126.607 87.8881 126.692C88.091 126.777 88.3145 126.801 88.5307 126.76C88.7468 126.719 88.946 126.615 89.1032 126.462C96.4017 119.25 109.21 113.221 141.804 113.224C144.217 113.224 146.531 112.271 148.238 110.573C149.944 108.876 150.903 106.574 150.903 104.174V22.7279C150.906 21.2421 150.541 19.7784 149.841 18.4659C149.141 17.1535 148.127 16.0327 146.888 15.2025Z" fill="white"/>
            </svg>
          </Typography>
          <h2 style={{marginLeft:'20px', color:'#121212'}}>Book Store</h2>
          <Search sx={{borderRadius:'10px', ml: 5, border:'1px solid #121212'  }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleDataChange}
            />
          </Search>
          <a href="/"><Typography sx={{marginRight:'20px', color:'#FB635D', display:{xs:'none', md:'block', marginLeft:'10px'}}}>
            Home
          </Typography></a>
          <a href="/Products"><Typography sx={{marginRight:'20px', color:'#FB635D', display:{xs:'none', md:'block'}}}>
            Products
          </Typography></a>
          <Typography sx={{marginRight:'20px', color:'#FB635D', display:{xs:'none', md:'block'}}}>
            Login
          </Typography>
          <Typography sx={{marginRight:'20px', color:'#FB635D', display:{xs:'none', md:'block'}}}>
            About Us
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <FavoriteBorderOutlinedIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <LocalMallOutlinedIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <LoginOutlinedIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}