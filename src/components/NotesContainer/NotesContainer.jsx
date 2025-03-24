import React, { useState, useEffect, useRef, useContext } from "react";
import NoteCard from "../NoteCard/NoteCard";
import { getNotes, createNote } from "../../utils/Api";
import "./NotesContainer.scss";
import { TextField, Paper, IconButton, Button, Menu, MenuItem } from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import BrushIcon from "@mui/icons-material/Brush";
import ImageIcon from "@mui/icons-material/Image";
import ArchiveIcon from "@mui/icons-material/Archive";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { SearchQuery } from "../../App"; 

function NotesContainer() {
    const [notesList, setNotesList] = useState([]);
    const [refresh, setRefresh] = useState(false); 
    const [isExpanded, setIsExpanded] = useState(false);
    const [note, setNote] = useState({ title: "", description: "", color: "#FFFFFF" });
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);
    const noteRef = useRef(null);
    const searchQuery = useContext(SearchQuery); 

    useEffect(() => {
        fetchNotes();
    }, [refresh]); 

    const fetchNotes = async () => {
        try {
            const response = await getNotes();
            if (response.success && Array.isArray(response.data)) {
                setNotesList(response.data);
            } else {
                console.error("Invalid API response format");
            }
        } catch (error) {
            console.error("Failed to fetch notes:", error);
        }
    };

    const addNote = async () => {
        if (!note.title.trim() && !note.description.trim()) return;

        try {
            const response = await createNote(note);
            if (response?.success) {
                setRefresh((prev) => !prev); // Toggle refresh to re-fetch notes
            }
        } catch (error) {
            console.error("Failed to create note:", error);
        }

        setNote({ title: "", description: "", color: "#FFFFFF" });
        setIsExpanded(false);
    };

    const updateNotes = (noteId, action) => {
        setNotesList((prevNotes) => {
            if (action === "delete" || action === "permanentDelete") {
                return prevNotes.filter((note) => note.noteId !== noteId);
            } else {
                return prevNotes.map((note) => {
                    if (note.noteId === noteId) {
                        switch (action) {
                            case "archive":
                                return { ...note, archived: true };
                            case "unarchive":
                                return { ...note, archived: false };
                            case "restore":
                                return { ...note, deleted: false };
                            default:
                                return note;
                        }
                    }
                    return note;
                });
            }
        });

        setRefresh((prev) => !prev); // Toggle refresh to re-fetch notes
    };

    const filteredNotes = notesList.filter(
        (note) =>
            note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            note.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleMenuOpen = (event) => setMenuAnchorEl(event.currentTarget);
    const handleMenuClose = () => setMenuAnchorEl(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (noteRef.current && !noteRef.current.contains(event.target)) {
                setIsExpanded(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="notes-container">
            <Paper ref={noteRef} className={`note-input ${isExpanded ? "expanded" : ""}`} elevation={3} onClick={() => setIsExpanded(true)}>
                {!isExpanded && (
                    <div className="collapsed-view">
                        <span>Take a note...</span>
                        <div className="collapsed-icons">
                            <IconButton><CheckBoxIcon /></IconButton>
                            <IconButton><BrushIcon /></IconButton>
                            <IconButton><ImageIcon /></IconButton>
                        </div>
                    </div>
                )}
                {isExpanded && (
                    <>
                        <TextField
                            id="outlined-basic"
                            fullWidth
                            variant="outlined"
                            placeholder="Title"
                            value={note.title}
                            onChange={(e) => setNote(prev => ({ ...prev, title: e.target.value }))}
                            className="title-input"
                        />
                        <TextField
                            id="outlined-multiline-flexible"
                            placeholder="Take a note..."
                            multiline
                            fullWidth
                            maxRows={4}
                            value={note.description}
                            onChange={(e) => setNote(prev => ({ ...prev, description: e.target.value }))}
                            className="note-input-field"
                        />
                        <div className="expanded-icons">
                            <IconButton onClick={addNote}><AddIcon /></IconButton>
                            <IconButton onClick={() => updateNotes(note.noteId, "archive")}><ArchiveIcon /></IconButton>
                            <IconButton onClick={handleMenuOpen}><MoreVertIcon /></IconButton>
                            <Menu anchorEl={menuAnchorEl} open={Boolean(menuAnchorEl)} onClose={handleMenuClose}>
                                <MenuItem onClick={handleMenuClose}>Option 1</MenuItem>
                                <MenuItem onClick={handleMenuClose}>Option 2</MenuItem>
                            </Menu>
                            <Button
                                variant="text"
                                onClick={() => {
                                    setIsExpanded(false);
                                    addNote();
                                }}
                            >
                                Close
                            </Button>
                        </div>
                    </>
                )}
            </Paper>

            {/* Notes List */}
            {filteredNotes.length > 0 ? (
                <div className="notes-list">
                    {filteredNotes.slice().reverse().map((note) => (
                        <NoteCard key={note.noteId} noteDetails={note} notes="notes" onNoteAction={updateNotes} />
                    ))}
                </div>
            ) : (
                <p className="no-notes">No notes available. Start taking notes!</p>
            )}
        </div>
    );
}

export default NotesContainer;
