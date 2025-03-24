import React, { useState, useContext, useCallback } from "react";
import { AppBar, Toolbar, Typography, IconButton, InputBase } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { debounce } from 'lodash';
import { UpdateSearchQuery } from '../../App';
import "./Navbar.scss";
import keepLogo from "../../assets/keep.png";

function Navbar({ toggleDrawer }) {
  const setSearchQuery = useContext(UpdateSearchQuery);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();


  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const debouncedSearch = useCallback(
    debounce((query) => {
      setSearchQuery(query);
    }, 1200),
    [setSearchQuery]
  );
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    sessionStorage.clear();

    navigate("/");
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
    debouncedSearch(e.target.value);
  };

  return (
    <AppBar position="fixed" className="navbar">
      <Toolbar>
        {/* Sidebar Toggle Button */}
        <IconButton edge="start" className="icon-button" onClick={toggleDrawer}>
          <MenuIcon className="gray-icon" />
        </IconButton>

        {/* Logo and Title */}
        <img src={keepLogo} alt="Keep Logo" className="keep-logo" />
        <Typography variant="h6" className="logo">
          Keep
        </Typography>

        {/* Search Bar */}
        <div className="search">
          <SearchIcon className="searchIcon" />
          <InputBase
            placeholder="Search..."
            className="searchInput"
            value={searchInput}
            onChange={handleSearchChange}
          />
        </div>

        {/* Icons */}
        <div className="icons">
          <IconButton className="icon-button">
            <RefreshIcon className="gray-icon" />
          </IconButton>
          <IconButton className="icon-button">
            <SettingsIcon className="gray-icon" />
          </IconButton>
          <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                >
                  <Avatar sx={{ width: 32, height: 32 }}>R</Avatar>
                </IconButton>
              </Tooltip>
            </Box>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              slotProps={{
                paper: {
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&::before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={handleClose}>
                <Avatar /> Profile
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Avatar sx={{ width: 32, height: 32 }}>A</Avatar>
                My account
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <PersonAdd fontSize="small" />
                </ListItemIcon>
                Add another account
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>

            </Menu>
          </React.Fragment>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;