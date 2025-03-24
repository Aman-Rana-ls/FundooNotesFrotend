import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.scss";

const drawerWidth = 220;

const NAVIGATION = [
  { segment: "notes", title: "Notes", icon: <LightbulbOutlinedIcon /> },
  { segment: "archive", title: "Archive", icon: <ArchiveOutlinedIcon /> },
  { segment: "trash", title: "Trash", icon: <DeleteOutlineOutlinedIcon /> },
];

export default function Sidebar({ open }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState(location.pathname);

  const handleNavigation = (path) => {
    setSelected(path);
    navigate(path);
  };

  return (
    <Drawer
      className={`sidebar ${open ? "" : "collapsed"}`}
      sx={{
        width: open ? drawerWidth : 80,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: open ? drawerWidth : 60,
          transition: "width 0.4s ease-in-out",
          boxSizing: "border-box",
          borderRight: "none",
          marginTop: ".7rem",
          display: "flex",
          alignItems: "flex-start", 
        },
      }}
      variant="permanent"
      anchor="left"
      open={open}
    >
      {/* Sidebar List */}
      <List sx={{ width: "100%" }}>
        {NAVIGATION.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              onClick={() => handleNavigation(`/dashboard/${item.segment}`)}
              sx={{
                borderRadius: open ? "0 25px 25px 0" : "50%",
                backgroundColor: selected === `/dashboard/${item.segment}` ? "#FEEFC3" : "transparent",
                "&:hover": {
                  backgroundColor: "#d3d3d3",
                },
                width: "100%",
                height: "48px",
                paddingLeft: open ? "16px" : "8px", 
                margin: open ? "0" : "8px 0", 
              }}
            >
              <ListItemIcon sx={{ minWidth: "40px" }}>
                {item.icon}
              </ListItemIcon>
              {open && <ListItemText primary={item.title} />}
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => handleNavigation("/dashboard/labels")}
            sx={{
              borderRadius: open ? "0 25px 25px 0" : "50%",
              backgroundColor: selected === "/dashboard/labels" ? "#d3d3d3" : "transparent",
              "&:hover": {
                backgroundColor: "#FEEFC3",
              },
              width: "100%",
              height: "48px",
              paddingLeft: open ? "16px" : "8px",
              margin: open ? "0" : "8px 0",
            }}
          >
            <ListItemIcon sx={{ minWidth: "40px" }}>
              <LabelOutlinedIcon />
            </ListItemIcon>
            {open && <ListItemText primary="Labels" sx={{ color: "#202124", fontWeight: "500" }} />}
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}
