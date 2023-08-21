// Navbar.tsx
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import logo from '../../assets/logo.png';

import * as S from './styled';

interface NavbarProps {
  onLogout: () => void;
  User: string | null;
}

export default function Navbar({ onLogout, User }: NavbarProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);


  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    onLogout();
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#416ab6' }}>
      <Toolbar>
        <S.BoxMenu>
          <S.Img src={logo} alt="logo" />
          <IconButton
            edge="end"
            color="inherit"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenuOpen}
          >
            <AccountCircle />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, marginLeft: 1 }}>
              {User}
            </Typography>
          </IconButton>
        </S.BoxMenu>

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
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

