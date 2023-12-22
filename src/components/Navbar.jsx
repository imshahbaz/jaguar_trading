import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { chartink_strategy2 } from '../constants/ChartInkStrategy';

export default function NavBar() {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: '#112A24' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Jaguar Trading
          </Typography>
          {false && (
            <Button color="inherit" onClick={() => navigate('/')}>
              Home
            </Button>
          )}
          <Scanners></Scanners>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

function Scanners() {
  const [anchorEl, setAnchorEl] = useState(
    (React.useState < null) | (HTMLElement > null)
  );
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [];

  chartink_strategy2.forEach((strategy) => {
    if (strategy.display) {
      menuItems.push(
        <a
          href={strategy.link}
          target="_blank"
          style={{ textDecoration: 'none' }}
          rel="noreferrer"
          key={strategy.name}
        >
          <MenuItem
            key={strategy.name}
            style={{ color: 'black' }}
            onClick={handleClose}
          >
            {strategy.name}
          </MenuItem>
        </a>
      );
    }
  });

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        style={{ color: 'white' }}
      >
        Scanners
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {menuItems}
      </Menu>
    </div>
  );
}
