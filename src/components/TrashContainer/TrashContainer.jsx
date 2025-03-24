import React, { useEffect, useState, useContext } from "react";
import { getBinNotes } from "../../utils/Api";
import NoteCard from "../NoteCard/NoteCard";
import { SearchQuery } from "../../App"; 
import "./TrashContainer.scss";

function TrashContainer() {
  const [noteList, setNotesList] = useState([]);
  const [refresh, setRefresh] = useState(false); 
  const searchQuery = useContext(SearchQuery); 

  useEffect(() => {
    fetchNotes();
  }, [refresh]); 

  const fetchNotes = async () => {
    try {
      const response = await getBinNotes();
      if (response.success && Array.isArray(response.data)) {
        console.log("Data fetched");
        setNotesList(response.data);
      } else {
        console.error("Invalid API response format");
      }
    } catch (error) {
      console.error("Error fetching trashed notes:", error);
    }
  };

  const updateNotes = (noteId, action) => {
    setNotesList((prevNotes) => {
      if (action === "permanentDelete") {
        return prevNotes.filter((note) => note.noteId !== noteId);
      }
      return prevNotes.map((note) =>
        note.noteId === noteId
          ? {
              ...note,
              deleted: action === "delete",
              archived: action === "archive" ? true : action === "unarchive" ? false : note.archived,
            }
          : note
      );
    });


    setRefresh((prev) => !prev);
  };

  
  const filteredNotes = noteList.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="trash-container">
      {filteredNotes.length > 0 ? (
        <div className="notes-grid">
          {filteredNotes.map((note) => (
            <NoteCard key={note.noteId} noteDetails={note} notes="trash" onNoteAction={updateNotes} />
          ))}
        </div>
      ) : (
        <div className="empty-message">
          <h1>No Trashed Notes</h1>
        </div>
      )}
    </div>
  );
}

export default TrashContainer;
