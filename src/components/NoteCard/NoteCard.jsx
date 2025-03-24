import React, { useState, useRef, useEffect } from "react";
import "./NoteCard.scss";
import {
  IconButton,
  Paper,
  ClickAwayListener,
  Grow,
  Popper,
  MenuList,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Menu,
  Box,
} from "@mui/material";
import ArchiveIcon from "@mui/icons-material/Archive";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import PushPinIcon from "@mui/icons-material/PushPin";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import ImageIcon from "@mui/icons-material/Image";
import {
  deleteNote,
  archiveNote,
  unarchiveNote,
  restoreNoteFromBin,
  deleteNotePermanently,
} from "../../utils/Api";
import ColorPalette from "../ColorPalette/ColorPalette";

function NoteCard({ noteDetails, notes, onNoteAction }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const anchorRef = useRef(null);
  const [colorAnchorEl, setColorAnchorEl] = useState(null);
  const [noteColor, setNoteColor] = useState("#FFFFFF");
  const [collaboratorDialogOpen, setCollaboratorDialogOpen] = useState(false);
  const [collaborators, setCollaborators] = useState([]);
  const [newCollaboratorEmail, setNewCollaboratorEmail] = useState("");

  useEffect(() => {
    const savedColor = localStorage.getItem(`note-color-${noteDetails.noteId}`);
    if (savedColor) setNoteColor(savedColor);
  }, [noteDetails.noteId]);

  const handleToggleMenu = () => setMenuOpen((prevOpen) => !prevOpen);
  const handleCloseMenu = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) return;
    setMenuOpen(false);
  };

  const handleColorOpen = (event) => setColorAnchorEl(event.currentTarget);
  const handleColorClose = () => setColorAnchorEl(null);

  const handleColorChange = (color) => {
    setNoteColor(color);
    localStorage.setItem(`note-color-${noteDetails.noteId}`, color);
    handleColorClose();
  };

  const handleNoteAction = async (action) => {
    try {
      switch (action) {
        case "delete":
          await deleteNote(noteDetails.noteId);
          break;
        case "archive":
          await archiveNote(noteDetails.noteId);
          break;
        case "unarchive":
          await unarchiveNote(noteDetails.noteId);
          break;
        case "restore":
          await restoreNoteFromBin(noteDetails.noteId);
          break;
        case "permanentDelete":
          await deleteNotePermanently(noteDetails.noteId);
          break;
        default:
          break;
      }
      onNoteAction(noteDetails.noteId, action);
    } catch (error) {
      console.error(`Error during ${action}:`, error);
    }
    setMenuOpen(false);
  };

  const handleCollaboratorDialogOpen = async () => {
    setCollaboratorDialogOpen(true);
    try {
      const collaborators = await getCollaborators(noteDetails.noteId);
      setCollaborators(collaborators);
    } catch (error) {
      console.error("Error fetching collaborators:", error);
    }
  };


  return (
    <div className="note-card" style={{ backgroundColor: noteColor }}>
      <div className="note-header">
        <h3 className="note-title">{noteDetails.title}</h3>
        <IconButton size="small">
          <PushPinIcon fontSize="small" />
        </IconButton>
      </div>
      <p className="note-description">{noteDetails.description}</p>
      <div className="note-actions">
        {notes !== "trash" && (
          <>
            <IconButton size="small" onClick={handleColorOpen}>
              <ColorLensIcon fontSize="small" />
            </IconButton>
            <Menu anchorEl={colorAnchorEl} open={Boolean(colorAnchorEl)} onClose={handleColorClose}>
              <ColorPalette onColorSelect={handleColorChange} />
            </Menu>

            <IconButton size="small">
              <AddAlertIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" >
              <PersonAddIcon fontSize="small" />
            </IconButton>
            <IconButton size="small">
              <CheckBoxIcon fontSize="small" />
            </IconButton>
            <IconButton size="small">
              <ImageIcon fontSize="small" />
            </IconButton>

            {notes === "notes" && (
              <IconButton size="small" onClick={() => handleNoteAction("archive")}>
                <ArchiveIcon fontSize="small" />
              </IconButton>
            )}
            {notes === "archive" && (
              <IconButton size="small" onClick={() => handleNoteAction("unarchive")}>
                <UnarchiveIcon fontSize="small" />
              </IconButton>
            )}

            <IconButton size="small" ref={anchorRef} onClick={handleToggleMenu}>
              <MoreVertIcon fontSize="small" />
            </IconButton>
          </>
        )}

        {notes === "trash" && (
          <>
            <IconButton size="small" onClick={() => handleNoteAction("restore")}>
              <RestoreFromTrashIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" onClick={() => handleNoteAction("permanentDelete")}>
              <DeleteForeverIcon fontSize="small" />
            </IconButton>
          </>
        )}
      </div>

      <Popper
        open={menuOpen}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        style={{ zIndex: 9999 }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === "bottom-start" ? "left top" : "left bottom" }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleCloseMenu}>
                <MenuList autoFocusItem={menuOpen} id="composition-menu">
                  <MenuItem onClick={() => handleNoteAction("delete")}>Delete Note</MenuItem>
                  <MenuItem onClick={handleCloseMenu}>Change Label</MenuItem>
                  <MenuItem onClick={handleCloseMenu}>Add Collaborator</MenuItem>
                  <MenuItem onClick={handleCloseMenu}>Make a Copy</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}

export default NoteCard;