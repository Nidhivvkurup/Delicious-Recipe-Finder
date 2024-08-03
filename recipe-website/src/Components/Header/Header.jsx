import { Box, IconButton, Toolbar } from '@mui/material'
import React from 'react'
import Typography from '@mui/material/Typography';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Badge from '@mui/material/Badge';

function Header() {
  const navigate = useNavigate();

  const handleGoToCart = () => {
    navigate('/favorites');
  };

	const [auth, setAuth] = useState(true);
  const { cart } = useSelector(state => state.updateCart)
	const [anchorEl, setAnchorEl] = useState(null);
  const [anchor, setAnchor] = useState(null);
	const handleClose = () => {
		setAnchorEl(null);
		
	  };
	  const handleMenu = (event) => {
		  setAnchorEl(event.currentTarget);
	  };
    const handlelogin = () => {
      navigate('/login')
    }
    const handlelogout = () => {
      navigate('/logout')
    }
    const handleregister = () => {
      navigate('/register')
    }
    const handlehome = () => {
      navigate('/')
    }
  const handleClick = (event) => {
    setAnchor(event.currentTarget);
};

  return (
    <div>
	<div className='Header'>
      <Box elevation={0} sx={{ backgroundColor:"tomato", marginBottom:"10px"}}>
        <Toolbar>
          <Box sx={{
			display: "flex",
			justifyContent: "space-between",
			alignItems: "center",
			width: "100%",
		  }}
			component="div">
				<Box>
					<IconButton>
						<LunchDiningIcon onClick={handlehome} sx={{fontSize: '2.4rem', color: 'white'}}/>
					</IconButton>
				</Box>
				<Box>
					<Typography variant='h4' textAlign={'center'} fontFamily={'-moz-initial'} >
					Delicious Recipe Finder
					</Typography>
				</Box>
				<Box>
          <Badge badgeContent={cart.length} onClick={handleClick} color="success">
          <FavoriteIcon onClick={handleGoToCart} sx={{fontSize: '2.4rem'}}  color="info" />
      </Badge>
					<IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle sx={{fontSize: '2.4rem'}}/>
          </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}>
                <MenuItem onClick={handlelogin}>Login</MenuItem>
                <MenuItem onClick={handleregister}>Register</MenuItem>
                <MenuItem onClick={handlelogout}>Logout</MenuItem>
              </Menu>
				</Box>
          </Box>
        </Toolbar>
      </Box>
	  </div>
    </div>
  )
}

export default Header
